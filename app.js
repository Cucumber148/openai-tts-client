// OpenAI TTS Client main logic

class TTSClient {
    constructor() {
        this.currentLanguage = 'ru';
        this.init();
    }

    init() {
        this.loadSavedLanguage();
        this.setupEventListeners();
        this.loadSavedApiKey();
        this.applyTranslations();
    }

    // Load saved language or detect browser language
    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('tts_language');
        if (savedLanguage && window.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        } else {
            // Auto-detect browser language
            this.currentLanguage = this.detectBrowserLanguage();
        }
        document.getElementById('languageSelect').value = this.currentLanguage;
    }

    // Detect browser language and map to supported languages
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.toLowerCase();
        
        // Map browser language codes to our supported languages
        if (langCode.startsWith('en')) {
            return 'en';
        } else if (langCode.startsWith('zh')) {
            return 'zh';
        } else if (langCode.startsWith('ru')) {
            return 'ru';
        } else {
            // Default to English for unsupported languages
            return 'en';
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Language change
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // Speed slider
        const speedSlider = document.getElementById('speed');
        const speedValue = document.querySelector('.speed-value');
        speedSlider.addEventListener('input', (e) => {
            speedValue.textContent = e.target.value + 'x';
        });

        // API key
        const apiKeyInput = document.getElementById('apiKey');
        apiKeyInput.addEventListener('blur', () => {
            if (apiKeyInput.value) {
                localStorage.setItem('openai_api_key', apiKeyInput.value);
                this.loadModels();
            }
        });

        // Model change
        document.getElementById('model').addEventListener('change', (e) => {
            this.updateUIForModel(e.target.value);
        });

        // Form submission
        document.getElementById('ttsForm').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });
    }

    // Load saved API key
    loadSavedApiKey() {
        const savedKey = localStorage.getItem('openai_api_key');
        if (savedKey) {
            document.getElementById('apiKey').value = savedKey;
            this.loadModels();
        }
    }

    // Translation function
    t(key) {
        const keys = key.split('.');
        let value = window.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key;
            }
        }
        
        return value || key;
    }

    // Change language
    changeLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('tts_language', language);
        this.applyTranslations();
    }

    // Apply translations
    applyTranslations() {
        // Translate elements with data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.t(key);
        });

        // Translate placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            element.placeholder = this.t(key);
        });

        // Update page title
        document.title = this.t('pageTitle');

        // Update HTML language
        const langMap = { ru: 'ru', en: 'en', zh: 'zh-CN' };
        document.documentElement.lang = langMap[this.currentLanguage] || 'en';

        // Update select options
        this.updateSelectOptions();
    }

    // Update select options
    updateSelectOptions() {
        // Update models
        const modelSelect = document.getElementById('model');
        if (modelSelect.options.length === 1) {
            modelSelect.options[0].textContent = this.t('models.loading');
        }

        // Update voices
        const voiceSelect = document.getElementById('voice');
        Array.from(voiceSelect.options).forEach(option => {
            const key = option.getAttribute('data-translate');
            if (key) {
                option.textContent = this.t(key);
            }
        });

        // Update formats
        const formatSelect = document.getElementById('format');
        Array.from(formatSelect.options).forEach(option => {
            const key = option.getAttribute('data-translate');
            if (key) {
                option.textContent = this.t(key);
            }
        });
    }

    // Get model priority for sorting (higher = better/newer)
    getModelPriority(modelId) {
        const id = modelId.toLowerCase();
        
        // GPT-based models get highest priority
        if (id.includes('gpt') && id.includes('tts')) {
            return 100;
        }
        
        // HD models get medium-high priority
        if (id.includes('hd')) {
            return 50;
        }
        
        // Standard TTS models get medium priority
        if (id.startsWith('tts-')) {
            return 25;
        }
        
        // Unknown models get lowest priority
        return 1;
    }

    async loadModels() {
        const apiKey = document.getElementById('apiKey').value;
        const modelSelect = document.getElementById('model');
        
        if (!apiKey) {
            modelSelect.innerHTML = `<option value="">${this.t('models.enterKey')}</option>`;
            return;
        }

        try {
            modelSelect.innerHTML = `<option value="">${this.t('models.loadingModels')}</option>`;
            
            const response = await fetch('https://api.openai.com/v1/models', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                }
            });

            if (!response.ok) {
                throw new Error(this.t('errors.loadModels'));
            }

            const data = await response.json();
            const ttsModels = data.data.filter(model => 
                model.id.includes('tts') && 
                !model.id.includes('whisper')
            );

            modelSelect.innerHTML = '';
            
            if (ttsModels.length === 0) {
                modelSelect.innerHTML = `<option value="">${this.t('models.notFound')}</option>`;
                return;
            }

            ttsModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model.id;
                option.textContent = model.id;
                modelSelect.appendChild(option);
            });

            const defaultModel = ttsModels[0];
            if (defaultModel) {
                modelSelect.value = defaultModel.id;
                this.updateUIForModel(defaultModel.id);
            }

        } catch (error) {
            console.error('Error loading models:', error);
            modelSelect.innerHTML = `<option value="">${this.t('models.loadingError')}</option>`;
        }
    }

    // Update UI based on selected model
    updateUIForModel(modelId) {
        const instructionsGroup = document.getElementById('instructionsGroup');
        const speedGroup = document.getElementById('speedGroup');
        
        // GPT-based models support instructions
        if (this.isGptBasedModel(modelId)) {
            instructionsGroup.style.display = 'block';
            speedGroup.style.display = 'none';
        } else {
            instructionsGroup.style.display = 'none';
            speedGroup.style.display = 'block';
        }
    }

    // Check if model is GPT-based (supports instructions)
    isGptBasedModel(modelId) {
        return modelId.toLowerCase().includes('gpt') && modelId.toLowerCase().includes('tts');
    }

    // Update progress
    updateProgress(percentage, status, details = '') {
        const progressBar = document.getElementById('progressBar');
        const loadingStatus = document.getElementById('loadingStatus');
        const loadingDetails = document.getElementById('loadingDetails');
        const loadingTitle = document.getElementById('loadingTitle');
        
        progressBar.style.width = percentage + '%';
        loadingStatus.textContent = status;
        loadingDetails.textContent = percentage + '%';
        
        if (percentage < 30) {
            loadingTitle.textContent = this.t('loading.preparing');
        } else if (percentage < 70) {
            loadingTitle.textContent = this.t('loading.generating');
        } else {
            loadingTitle.textContent = this.t('loading.finishing');
        }
        
        if (details) {
            loadingDetails.textContent += ` • ${details}`;
        }
    }

    // Simulate progress
    simulateProgress() {
        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                
                if (progress < 30) {
                    this.updateProgress(Math.min(progress, 25), this.t('loading.sendingRequest'));
                } else if (progress < 60) {
                    this.updateProgress(Math.min(progress, 55), this.t('loading.processingText'));
                } else if (progress < 85) {
                    this.updateProgress(Math.min(progress, 80), this.t('loading.synthesizing'));
                } else {
                    this.updateProgress(90, this.t('loading.gettingResult'));
                    clearInterval(interval);
                    resolve();
                }
            }, 200 + Math.random() * 300);
        });
    }

    // Show errors
    showError(message) {
        const errorDiv = document.getElementById('error');
        errorDiv.innerHTML = `<strong>${this.t('errors.title')}</strong> ${message}`;
        errorDiv.style.display = 'block';
        console.error('Showing error to user:', message);
    }

    // Handle form submission
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const apiKey = document.getElementById('apiKey').value;
        const model = document.getElementById('model').value;
        const text = document.getElementById('text').value;
        const voice = document.getElementById('voice').value;
        const instructions = document.getElementById('instructions').value;
        const speed = parseFloat(document.getElementById('speed').value);
        const format = document.getElementById('format').value;
        
        // Validation
        if (!model) {
            this.showError(this.t('errors.selectModel'));
            return;
        }
        
        if (text.length > 4096) {
            this.showError(this.t('errors.textTooLong'));
            return;
        }
        
        // Hide previous results
        document.getElementById('result').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        document.getElementById('generateBtn').disabled = true;
        
        this.updateProgress(0, this.t('loading.initialization'), `${text.length} ${this.t('units.characters')}`);
        
        const progressPromise = this.simulateProgress();
        
        try {
            const requestData = {
                model: model,
                input: text,
                voice: voice,
                response_format: format
            };

            // Add parameters based on model capabilities
            if (this.isGptBasedModel(model)) {
                if (instructions.trim()) {
                    requestData.instructions = instructions.trim();
                }
            } else {
                requestData.speed = speed;
            }

            console.log('Sending request to OpenAI:', requestData);
            this.updateProgress(15, this.t('loading.connecting'), `${this.t('units.model')} ${model}`);

            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            console.log('Received API response:', response.status, response.statusText);

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error?.message || errorMessage;
                    console.error('API error:', errorData);
                } catch (e) {
                    console.error('Could not read error:', e);
                }
                throw new Error(errorMessage);
            }

            this.updateProgress(70, this.t('loading.downloadingAudio'), `${this.t('units.format')} ${format.toUpperCase()}`);

            const audioBlob = await response.blob();
            console.log('Received audio:', audioBlob.size, this.t('units.bytes'));

            // Wait for progress animation to finish
            await progressPromise;
            this.updateProgress(100, this.t('loading.ready'), `${(audioBlob.size / 1024).toFixed(1)} ${this.t('units.kb')}`);

            // Small delay to show 100%
            await new Promise(resolve => setTimeout(resolve, 500));

            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Show result
            const audioPlayer = document.getElementById('audioPlayer');
            const downloadBtn = document.getElementById('downloadBtn');
            const resultDiv = document.getElementById('result');
            
            audioPlayer.src = audioUrl;
            downloadBtn.href = audioUrl;
            downloadBtn.download = `tts_${voice}_${Date.now()}.${format}`;
            
            resultDiv.style.display = 'block';
            resultDiv.classList.add('success-animation');
            
            console.log('Audio generated successfully!');
            
        } catch (error) {
            console.error('Generation error:', error);
            this.showError(error.message);
        } finally {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('generateBtn').disabled = false;
        }
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    window.ttsClient = new TTSClient();
});
