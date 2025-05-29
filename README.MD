# OpenAI TTS Web Client

[English](README.MD) | [Русский](README.RU.MD) | [中文](README.ZH.MD)

A simple unofficial web client for OpenAI Text-to-Speech API with multi-language interface support.

## Features

- **Automatic model loading**: fetches all available TTS models via API
- **10 voices**: alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer
- **GPT model support**: with prompts for speech control (accent, emotions, tone)
- **Flexible settings**: speech speed, audio format, voice instructions
- **Responsive design**: works on desktop and mobile devices

## Quick Start

1. Open [https://cucumber148.github.io/openai-tts-client](https://cucumber148.github.io/openai-tts-client)
2. Enter your OpenAI API key
3. Select model and voice
4. Enter text and click "Generate Speech"

## Supported Models

The application automatically loads all available TTS models from your OpenAI account.

## Audio Formats

- **MP3** - Universal format (default)
- **Opus** - For internet streaming, low latency
- **AAC** - For mobile devices and YouTube
- **FLAC** - Lossless compression
- **WAV** - Uncompressed, low latency
- **PCM** - Raw audio data

## Speech Control (GPT Models)

GPT models support instructions for controlling various aspects of speech:

- **Accent**: "Use a British accent"
- **Emotions**: "Speak cheerfully and energetically"
- **Tone**: "Speak like a radio host"
- **Pace**: "Speak slowly and clearly"
- **Style**: "Speak in a whisper"

## Technical Features

- Automatic language detection based on browser settings
- Dynamic model support - automatically picks up new OpenAI models
- Local storage of API key and settings in browser
- Direct requests to OpenAI API without intermediate servers

## Requirements

- OpenAI API key with access to TTS models

## Limitations

- Maximum text length: 4096 characters
- Speech speed adjustable only for legacy models

## Local Development

```bash
git clone https://github.com/cucumber148/openai-tts-client
cd openai-tts-client
```

## Support

If you encounter issues:

1. Check browser console (F12) for errors
2. Verify API key is correct
3. Check OpenAI account limits
4. Create an issue in the GitHub repository

## About the Project

I wrote this application in a few minutes for quick testing of the OpenAI TTS API. Decided to share it on GitHub in case it might be useful to someone.

## License

GPL-3.0 License
