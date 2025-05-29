// English language pack
window.translations = window.translations || {};
window.translations.en = {
    // Headers and main elements
    title: "OpenAI TTS",
    pageTitle: "OpenAI TTS Client",
    
    // Information blocks
    modelInfo: {
        title: "💡 Model Information:",
    },
    
    // Forms and fields
    form: {
        apiKey: "🔑 OpenAI API Key",
        apiKeyPlaceholder: "sk-...",
        model: "🤖 TTS Model",
        text: "📝 Text to Speech",
        textPlaceholder: "Enter text to convert to speech...",
        instructions: "🎭 Speech Instructions (GPT models only)",
        instructionsPlaceholder: "E.g.: Speak cheerfully and positively. Use a British accent.",
        instructionsHint: "You can control: accent, emotions, intonation, speed, tone",
        voice: "🗣️ Voice",
        format: "🎧 Audio Format",
        speed: "⚡ Speech Speed (legacy models only)",
        speedHint: "For GPT models use instructions above",
        generateBtn: "🎤 Generate Speech"
    },
    
    // Model options
    models: {
        loading: "Loading models...",
        enterKey: "Enter API key to load models",
        loadingModels: "🔄 Loading models...",
        notFound: "❌ TTS models not found",
        loadingError: "❌ Error loading models",
        gpt4oMiniDesc: " (🆕 Latest with prompts)",
        tts1HdDesc: " (HD quality)",
        tts1Desc: " (Fast)"
    },
    
    // Voices
    voices: {
        alloy: "Alloy",
        ash: "Ash (new)",
        ballad: "Ballad (new)",
        coral: "Coral (new)",
        echo: "Echo",
        fable: "Fable",
        nova: "Nova",
        onyx: "Onyx",
        sage: "Sage (new)",
        shimmer: "Shimmer"
    },
    
    // Audio formats
    formats: {
        mp3: "MP3 (default)",
        opus: "Opus (low latency)",
        aac: "AAC (YouTube, mobile)",
        flac: "FLAC (lossless)",
        wav: "WAV (low latency)",
        pcm: "PCM (raw data)"
    },
    
    // Loading and progress
    loading: {
        preparing: "Preparing request...",
        generating: "🎤 Generating audio...",
        finishing: "✅ Finishing processing...",
        initialization: "Initialization...",
        sendingRequest: "Sending request to OpenAI API...",
        processingText: "Processing text with neural network...",
        synthesizing: "Synthesizing audio file...",
        gettingResult: "Getting result...",
        connecting: "Connecting to OpenAI API...",
        downloadingAudio: "Downloading audio data...",
        ready: "Ready!"
    },
    
    // Results
    result: {
        title: "✅ Audio ready!",
        download: "⬇️ Download audio"
    },
    
    // Errors
    errors: {
        title: "❌ Error:",
        selectModel: "Select a TTS model",
        textTooLong: "Text too long! Maximum 4096 characters.",
        loadModels: "Failed to load models"
    },
    
    // Language selector
    language: {
        label: "🌍 Interface Language",
        ru: "Русский",
        en: "English",
        zh: "中文"
    },
    
    // Units
    units: {
        characters: "characters",
        kb: "KB",
        bytes: "bytes",
        model: "Model:",
        format: "Format:"
    }
};
