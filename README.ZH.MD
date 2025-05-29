# OpenAI TTS Web Client                                                                          
[English](README.MD) | [Русский](README.RU.MD) | [中文](README.ZH.MD)                            

一个简单的网页客户端，用于使用 OpenAI 文本转语音 API，支持多语言界面。

## 功能特性

- **自动加载模型**：通过 API 获取所有可用的 TTS 模型
- **10 种语音**：alloy、ash、ballad、coral、echo、fable、nova、onyx、sage、shimmer              
- **支持 GPT 模型**：通过提示词控制语音（口音、情感、语调）
- **灵活设置**：语音速度、音频格式、语音指令                       
- **响应式设计**：适配桌面和移动设备

## 快速开始

1. 打开 [https://cucumber148.github.io/openai-tts-client](https://cucumber148.github.io/openai-tts-client)
2. 输入您的 OpenAI API 密钥                                                                   
3. 选择模型和语音
4. 输入文本并点击"生成语音"                                                  

## 支持的模型

应用程序会自动从您的 OpenAI 账户加载所有可用的 TTS 模型。

## 音频格式

- **MP3** - 通用格式（默认）
- **Opus** - 用于网络流媒体，低延迟
- **AAC** - 适用于移动设备和 YouTube
- **FLAC** - 无损压缩
- **WAV** - 无压缩，低延迟
- **PCM** - 原始音频数据

## 语音控制（GPT 模型）

GPT 模型支持使用指令控制语音的各种方面：

- **口音**："使用英式口音"
- **情感**："说话要愉快而有活力"
- **语调**："像电台主持人一样说话"
- **节奏**："说话要慢而清晰"
- **风格**："轻声说话"

## 技术特点

- 根据浏览器设置自动检测语言
- 动态模型支持 - 自动获取 OpenAI 的新模型
- 在浏览器中本地存储 API 密钥和设置
- 直接向 OpenAI API 发送请求，无中间服务器

## 要求

- 具有 TTS 模型访问权限的 OpenAI API 密钥

## 限制

- 最大文本长度：4096 个字符
- 语音速度仅可在传统模型中调整

## 本地开发

```bash
git clone https://github.com/cucumber148/openai-tts-client
cd openai-tts-client
```

## 支持

如遇到问题：

1. 检查浏览器控制台（F12）是否有错误
2. 确保 API 密钥正确
3. 检查 OpenAI 账户限制
4. 在 GitHub 仓库中创建 issue

## 关于项目

我在几分钟内编写了这个应用程序，用于快速测试 OpenAI TTS API。决定在 GitHub 上分享，以防对其他人有用。

## 许可证

GPL-3.0 License
