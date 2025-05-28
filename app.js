// Основная логика OpenAI TTS Client

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

    // Загрузка сохраненного языка
    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('tts_language');
        if (savedLanguage && window.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        }
        document.getElementById('languageSelect').value = this.currentLanguage;
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        // Смена языка
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // Слайдер скорости
        const speedSlider = document.getElementById('speed');
        const speedValue = document.querySelector('.speed-value');
        speedSlider.addEventListener('input', (e) => {
            speedValue.textContent = e.target.value + 'x';
        });

        // API ключ
        const apiKeyInput = document.getElementById('apiKey');
        apiKeyInput.addEventListener('blur', () => {
            if (apiKeyInput.value) {
                localStorage.setItem('openai_api_key', apiKeyInput.value);
                this.loadModels();
            }
        });

        // Смена модели
        document.getElementById('model').addEventListener('change', (e) => {
            this.updateUIForModel(e.target.value);
        });

        // Отправка формы
        document.getElementById('ttsForm').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });
    }

    // Загрузка сохраненного API ключа
    loadSavedApiKey() {
        const savedKey = localStorage.getItem('openai_api_key');
        if (savedKey) {
            document.getElementById('apiKey').value = savedKey;
            this.loadModels();
        }
    }

    // Функция перевода
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

    // Смена языка
    changeLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('tts_language', language);
        this.applyTranslations();
    }

    // Применение переводов
    applyTranslations() {
        // Переводим элементы с data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.t(key);
        });

        // Переводим плейсхолдеры
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            element.placeholder = this.t(key);
        });

        // Обновляем заголовок страницы
        document.title = this.t('pageTitle');

        // Обновляем язык HTML
        const langMap = { ru: 'ru', en: 'en', zh: 'zh-CN' };
        document.documentElement.lang = langMap[this.currentLanguage] || 'ru';

        // Обновляем опции в селектах
        this.updateSelectOptions();
    }

    // Обновление опций в селектах
    updateSelectOptions() {
        // Обновляем модели
        const modelSelect = document.getElementById('model');
        if (modelSelect.options.length === 1) {
            modelSelect.options[0].textContent = this.t('models.loading');
        }

        // Обновляем голоса
        const voiceSelect = document.getElementById('voice');
        Array.from(voiceSelect.options).forEach(option => {
            const key = option.getAttribute('data-translate');
            if (key) {
                option.textContent = this.t(key);
            }
        });

        // Обновляем форматы
        const formatSelect = document.getElementById('format');
        Array.from(formatSelect.options).forEach(option => {
            const key = option.getAttribute('data-translate');
            if (key) {
                option.textContent = this.t(key);
            }
        });
    }

    // Загрузка доступных моделей
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
            ).sort((a, b) => {
                if (a.id.includes('gpt-4o-mini-tts')) return -1;
                if (b.id.includes('gpt-4o-mini-tts')) return 1;
                if (a.id.includes('tts-1-hd')) return -1;
                if (b.id.includes('tts-1-hd')) return 1;
                return a.id.localeCompare(b.id);
            });

            modelSelect.innerHTML = '';
            
            if (ttsModels.length === 0) {
                modelSelect.innerHTML = `<option value="">${this.t('models.notFound')}</option>`;
                return;
            }

            ttsModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model.id;
                
                let description = '';
                if (model.id.includes('gpt-4o-mini-tts')) {
                    description = this.t('models.gpt4oMiniDesc');
                } else if (model.id.includes('tts-1-hd')) {
                    description = this.t('models.tts1HdDesc');
                } else if (model.id.includes('tts-1')) {
                    description = this.t('models.tts1Desc');
                }
                
                option.textContent = model.id + description;
                modelSelect.appendChild(option);
            });

            const defaultModel = ttsModels.find(m => m.id.includes('gpt-4o-mini-tts'));
            if (defaultModel) {
                modelSelect.value = defaultModel.id;
                this.updateUIForModel(defaultModel.id);
            }

        } catch (error) {
            console.error('Ошибка загрузки моделей:', error);
            modelSelect.innerHTML = `<option value="">${this.t('models.loadingError')}</option>`;
        }
    }

    // Обновление интерфейса в зависимости от выбранной модели
    updateUIForModel(modelId) {
        const instructionsGroup = document.getElementById('instructionsGroup');
        const speedGroup = document.getElementById('speedGroup');
        
        if (modelId.includes('gpt-4o-mini-tts')) {
            instructionsGroup.style.display = 'block';
            speedGroup.style.display = 'none';
        } else {
            instructionsGroup.style.display = 'none';
            speedGroup.style.display = 'block';
        }
    }

    // Обновление прогресса
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

    // Имитация прогресса
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

    // Показ ошибок
    showError(message) {
        const errorDiv = document.getElementById('error');
        errorDiv.innerHTML = `<strong>${this.t('errors.title')}</strong> ${message}`;
        errorDiv.style.display = 'block';
        console.error('🚨 Показываем ошибку пользователю:', message);
    }

    // Обработка отправки формы
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const apiKey = document.getElementById('apiKey').value;
        const model = document.getElementById('model').value;
        const text = document.getElementById('text').value;
        const voice = document.getElementById('voice').value;
        const instructions = document.getElementById('instructions').value;
        const speed = parseFloat(document.getElementById('speed').value);
        const format = document.getElementById('format').value;
        
        // Валидация
        if (!model) {
            this.showError(this.t('errors.selectModel'));
            return;
        }
        
        if (text.length > 4096) {
            this.showError(this.t('errors.textTooLong'));
            return;
        }
        
        // Скрываем предыдущие результаты
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

            // Добавляем параметры в зависимости от модели
            if (model.includes('gpt-4o-mini-tts')) {
                if (instructions.trim()) {
                    requestData.instructions = instructions.trim();
                }
            } else {
                requestData.speed = speed;
            }

            console.log('🚀 Отправляем запрос к OpenAI:', requestData);
            this.updateProgress(15, this.t('loading.connecting'), `${this.t('units.model')} ${model}`);

            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            console.log('📡 Получен ответ от API:', response.status, response.statusText);

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error?.message || errorMessage;
                    console.error('❌ Ошибка API:', errorData);
                } catch (e) {
                    console.error('❌ Не удалось прочитать ошибку:', e);
                }
                throw new Error(errorMessage);
            }

            this.updateProgress(70, this.t('loading.downloadingAudio'), `${this.t('units.format')} ${format.toUpperCase()}`);

            const audioBlob = await response.blob();
            console.log('🎵 Получено аудио:', audioBlob.size, this.t('units.bytes'));

            // Ждем завершения анимации прогресса
            await progressPromise;
            this.updateProgress(100, this.t('loading.ready'), `${(audioBlob.size / 1024).toFixed(1)} ${this.t('units.kb')}`);

            // Небольшая задержка для показа 100%
            await new Promise(resolve => setTimeout(resolve, 500));

            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Показываем результат
            const audioPlayer = document.getElementById('audioPlayer');
            const downloadBtn = document.getElementById('downloadBtn');
            const resultDiv = document.getElementById('result');
            
            audioPlayer.src = audioUrl;
            downloadBtn.href = audioUrl;
            downloadBtn.download = `tts_${voice}_${Date.now()}.${format}`;
            
            resultDiv.style.display = 'block';
            resultDiv.classList.add('success-animation');
            
            console.log('✅ Аудио успешно сгенерировано!');
            
        } catch (error) {
            console.error('💥 Ошибка генерации:', error);
            this.showError(error.message);
        } finally {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('generateBtn').disabled = false;
        }
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.ttsClient = new TTSClient();
});
