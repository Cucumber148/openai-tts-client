// Русский языковой пакет
window.translations = window.translations || {};
window.translations.ru = {
    // Заголовки и основные элементы
    title: "OpenAI TTS",
    pageTitle: "OpenAI TTS Client",
    
    // Информационные блоки
    modelInfo: {
        title: "💡 Информация о моделях:",
        gpt4oMini: "Новейшая модель с управляемой речью и промптами",
        tts1: "Быстрая генерация, стандартное качество",
        tts1Hd: "Высокое качество звука"
    },
    
    // Формы и поля
    form: {
        apiKey: "🔑 OpenAI API Key",
        apiKeyPlaceholder: "sk-...",
        model: "🤖 Модель TTS",
        text: "📝 Текст для озвучивания",
        textPlaceholder: "Введите текст для преобразования в речь...",
        instructions: "🎭 Инструкции для речи (только для gpt-4o-mini-tts)",
        instructionsPlaceholder: "Например: Говори весело и позитивно. Используй британский акцент.",
        instructionsHint: "Можно управлять: акцентом, эмоциями, интонацией, скоростью, тоном",
        voice: "🗣️ Голос",
        format: "🎧 Формат аудио",
        speed: "⚡ Скорость речи (только для старых моделей)",
        speedHint: "Для gpt-4o-mini-tts используйте инструкции выше",
        generateBtn: "🎤 Сгенерировать речь"
    },
    
    // Опции моделей
    models: {
        loading: "Загрузка моделей...",
        enterKey: "Введите API ключ для загрузки моделей",
        loadingModels: "🔄 Загрузка моделей...",
        notFound: "❌ TTS модели не найдены",
        loadingError: "❌ Ошибка загрузки моделей",
        gpt4oMiniDesc: " (🆕 Новейшая с промптами)",
        tts1HdDesc: " (HD качество)",
        tts1Desc: " (Быстрая)"
    },
    
    // Голоса
    voices: {
        alloy: "Alloy",
        ash: "Ash (новый)",
        ballad: "Ballad (новый)",
        coral: "Coral (новый)",
        echo: "Echo",
        fable: "Fable",
        nova: "Nova",
        onyx: "Onyx",
        sage: "Sage (новый)",
        shimmer: "Shimmer"
    },
    
    // Форматы аудио
    formats: {
        mp3: "MP3 (по умолчанию)",
        opus: "Opus (низкая задержка)",
        aac: "AAC (YouTube, мобильные)",
        flac: "FLAC (без потерь)",
        wav: "WAV (низкая задержка)",
        pcm: "PCM (сырые данные)"
    },
    
    // Теги голосов
    voiceTags: {
        count: "10 голосов",
        optimized: "Оптимизированы для английского",
        tryOn: "Попробуйте на OpenAI.com"
    },
    
    // Загрузка и прогресс
    loading: {
        preparing: "Подготовка запроса...",
        generating: "🎤 Генерируем аудио...",
        finishing: "✅ Завершаем обработку...",
        initialization: "Инициализация...",
        sendingRequest: "Отправка запроса к OpenAI API...",
        processingText: "Обработка текста нейросетью...",
        synthesizing: "Синтез аудио файла...",
        gettingResult: "Получение результата...",
        connecting: "Подключение к OpenAI API...",
        downloadingAudio: "Загрузка аудио данных...",
        ready: "Готово!"
    },
    
    // Результаты
    result: {
        title: "✅ Аудио готово!",
        download: "⬇️ Скачать аудио"
    },
    
    // Ошибки
    errors: {
        title: "❌ Ошибка:",
        selectModel: "Выберите модель TTS",
        textTooLong: "Текст слишком длинный! Максимум 4096 символов.",
        loadModels: "Не удалось загрузить модели"
    },
    
    // Селектор языка
    language: {
        label: "🌍 Язык интерфейса",
        ru: "Русский",
        en: "English",
        zh: "中文"
    },
    
    // Единицы измерения
    units: {
        characters: "символов",
        kb: "КБ",
        bytes: "байт",
        model: "Модель:",
        format: "Формат:"
    }
};
