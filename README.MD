# OpenAI TTS Web Client

[English](README.MD) | [Русский](README.RU.MD) | [中文](README.ZH.MD)

Simple web client for OpenAI Text-to-Speech API. All features in a single HTML file.

## Features

- Automatic loading of available TTS models via API
- Support for 11 voices: alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer
- Support for gpt-4o-mini-tts model with speech control prompts
- Configurable speed, audio format, and voice instructions
- Progress bar with detailed process information
- Built-in audio player and download functionality
- Support for 50+ languages (optimized for English)

## Installation and Usage

1. Download the `openai-tts-client.html` file
2. Open in browser (works locally, no server required)
3. Enter your OpenAI API key
4. Enter text and generate speech

## Supported Models

- **gpt-4o-mini-tts** - Model with controllable speech via prompts
- **tts-1** - Standard quality, fast generation
- **tts-1-hd** - High quality audio

The application automatically loads all available TTS models from your OpenAI account.

## Audio Formats

- **MP3** - Universal format (default)
- **Opus** - For internet streaming, low latency
- **AAC** - For mobile devices and YouTube
- **FLAC** - Lossless compression
- **WAV** - Uncompressed, low latency
- **PCM** - Raw audio data

## Speech Control

The gpt-4o-mini-tts model supports instructions for controlling various aspects of speech:

- Accent: "Use British accent"
- Emotional tone: "Speak cheerfully and energetically"
- Voice tone: "Speak like a radio host"
- Speech pace: "Speak slowly and clearly"
- Pronunciation style: "Speak in a whisper"

## Technical Details

- Single HTML file with no external dependencies
- Works locally in browser
- API key stored in browser localStorage
- Direct requests to OpenAI API
- Detailed logging in browser console for debugging

## Requirements

- OpenAI API key with access to TTS models
- Modern browser with Fetch API support
- Internet connection

## Limitations

- Maximum text length: 4096 characters
- Speech speed adjustable only for tts-1 and tts-1-hd models
- Static voice list (OpenAI doesn't provide API for voice enumeration)

## Pricing

Uses standard OpenAI rates: approximately $0.015 per 1000 input characters.

## Troubleshooting

If something doesn't work:

1. Open browser console (F12)
2. Check detailed request and response logs
3. Verify API key correctness
4. Check OpenAI account limits and balance

## Documentation

- [OpenAI Text-to-Speech Guide](https://platform.openai.com/docs/guides/text-to-speech)
- [API Reference](https://platform.openai.com/docs/api-reference/audio/createSpeech)
- [Pricing Information](https://openai.com/pricing)

## About This Project

I wrote this application in a few minutes for quick testing of the OpenAI TTS API. Decided to share it on GitHub in case someone finds it useful.

## License

GPL-3.0 License
