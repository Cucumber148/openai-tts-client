// 中文语言包
window.translations = window.translations || {};
window.translations.zh = {
    // 标题和主要元素
    title: "OpenAI TTS",
    pageTitle: "OpenAI TTS 客户端",
    
    // 信息块
    modelInfo: {
        title: "💡 模型信息：",
        gpt4oMini: "最新模型，支持可控语音和提示词",
        tts1: "快速生成，标准质量",
        tts1Hd: "高质量音频"
    },
    
    // 表单和字段
    form: {
        apiKey: "🔑 OpenAI API 密钥",
        apiKeyPlaceholder: "sk-...",
        model: "🤖 TTS 模型",
        text: "📝 待转换文本",
        textPlaceholder: "输入要转换为语音的文本...",
        instructions: "🎭 语音指令（仅限 gpt-4o-mini-tts）",
        instructionsPlaceholder: "例如：说话要愉快积极。使用英式口音。",
        instructionsHint: "可以控制：口音、情感、语调、速度、音调",
        voice: "🗣️ 语音",
        format: "🎧 音频格式",
        speed: "⚡ 语速（仅限旧模型）",
        speedHint: "对于 gpt-4o-mini-tts，请使用上面的指令",
        generateBtn: "🎤 生成语音"
    },
    
    // 模型选项
    models: {
        loading: "加载模型中...",
        enterKey: "输入 API 密钥以加载模型",
        loadingModels: "🔄 加载模型中...",
        notFound: "❌ 未找到 TTS 模型",
        loadingError: "❌ 加载模型错误",
        gpt4oMiniDesc: "（🆕 最新支持提示词）",
        tts1HdDesc: "（高质量）",
        tts1Desc: "（快速）"
    },
    
    // 语音
    voices: {
        alloy: "Alloy",
        ash: "Ash（新）",
        ballad: "Ballad（新）",
        coral: "Coral（新）",
        echo: "Echo",
        fable: "Fable",
        nova: "Nova",
        onyx: "Onyx",
        sage: "Sage（新）",
        shimmer: "Shimmer"
    },
    
    // 音频格式
    formats: {
        mp3: "MP3（默认）",
        opus: "Opus（低延迟）",
        aac: "AAC（YouTube、移动设备）",
        flac: "FLAC（无损）",
        wav: "WAV（低延迟）",
        pcm: "PCM（原始数据）"
    },
    
    // 语音标签
    voiceTags: {
        count: "10 种语音",
        optimized: "针对英语优化",
        tryOn: "在 OpenAI.com 试用"
    },
    
    // 加载和进度
    loading: {
        preparing: "准备请求...",
        generating: "🎤 生成音频中...",
        finishing: "✅ 完成处理中...",
        initialization: "初始化...",
        sendingRequest: "向 OpenAI API 发送请求...",
        processingText: "神经网络处理文本中...",
        synthesizing: "合成音频文件中...",
        gettingResult: "获取结果中...",
        connecting: "连接到 OpenAI API...",
        downloadingAudio: "下载音频数据中...",
        ready: "完成！"
    },
    
    // 结果
    result: {
        title: "✅ 音频已就绪！",
        download: "⬇️ 下载音频"
    },
    
    // 错误
    errors: {
        title: "❌ 错误：",
        selectModel: "请选择 TTS 模型",
        textTooLong: "文本过长！最多 4096 个字符。",
        loadModels: "加载模型失败"
    },
    
    // 语言选择器
    language: {
        label: "🌍 界面语言",
        ru: "Русский",
        en: "English",
        zh: "中文"
    },
    
    // 单位
    units: {
        characters: "个字符",
        kb: "KB",
        bytes: "字节",
        model: "模型：",
        format: "格式："
    }
};
