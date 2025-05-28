# OpenAI TTS Web 客户端

[English](README.MD) | [Русский](README.RU.MD) | [中文](README.ZH.MD)

用于 OpenAI 文本转语音 API 的简单网络客户端。所有功能集成在单个 HTML 文件中。

## 功能特性

- 通过 API 自动加载可用的 TTS 模型
- 支持 11 种语音：alloy、ash、ballad、coral、echo、fable、nova、onyx、sage、shimmer
- 支持 gpt-4o-mini-tts 模型的语音控制提示
- 可配置语速、音频格式和语音指令
- 带有详细过程信息的进度条
- 内置音频播放器和下载功能
- 支持 50+ 种语言（针对英语优化）

## 安装和使用

1. 下载 `openai-tts-client.html` 文件
2. 在浏览器中打开（本地运行，无需服务器）
3. 输入您的 OpenAI API 密钥
4. 输入文本并生成语音

## 支持的模型

- **gpt-4o-mini-tts** - 通过提示控制语音的模型
- **tts-1** - 标准质量，快速生成
- **tts-1-hd** - 高质量音频

应用程序会自动从您的 OpenAI 账户加载所有可用的 TTS 模型。

## 音频格式

- **MP3** - 通用格式（默认）
- **Opus** - 用于互联网流媒体，低延迟
- **AAC** - 适用于移动设备和 YouTube
- **FLAC** - 无损压缩
- **WAV** - 无压缩，低延迟
- **PCM** - 原始音频数据

## 语音控制

gpt-4o-mini-tts 模型支持控制语音各个方面的指令：

- 口音："使用英式口音"
- 情感色调："说话要愉快有活力"
- 语音音调："像电台主持人一样说话"
- 语速："慢慢清楚地说话"
- 发音风格："小声说话"

## 技术详情

- 单个 HTML 文件，无外部依赖
- 在浏览器中本地运行
- API 密钥存储在浏览器 localStorage 中
- 直接向 OpenAI API 发送请求
- 在浏览器控制台中详细记录以便调试

## 系统要求

- 有权访问 TTS 模型的 OpenAI API 密钥
- 支持 Fetch API 的现代浏览器
- 互联网连接

## 限制

- 最大文本长度：4096 个字符
- 语速仅可在 tts-1 和 tts-1-hd 模型中调整
- 静态语音列表（OpenAI 不提供语音枚举的 API）

## 定价

使用标准 OpenAI 费率：大约每 1000 个输入字符 $0.015。

## 故障排除

如果出现问题：

1. 打开浏览器控制台 (F12)
2. 检查详细的请求和响应日志
3. 验证 API 密钥的正确性
4. 检查 OpenAI 账户限制和余额

## 文档

- [OpenAI 文本转语音指南](https://platform.openai.com/docs/guides/text-to-speech)
- [API 参考](https://platform.openai.com/docs/api-reference/audio/createSpeech)
- [定价信息](https://openai.com/pricing)

## 关于此项目

我在几分钟内编写了这个应用程序，用于快速测试 OpenAI TTS API。决定在 GitHub 上分享，以防有人觉得有用。

## 许可证

GPL-3.0 许可证
