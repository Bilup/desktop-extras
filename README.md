# Bilup Desktop Extras

Extra tools for Bilup Desktop.

## PeerJS Server

A lightweight PeerJS signaling server for local network communication.

## Features

- Auto-detect Local IP
- Custom Port via `--peerjs-port` or `-p`
- Port check via `--check-port` or `-c`
- Auto-switch port when in use
- Cross-platform (Windows, macOS, Linux)

## Installation

```bash
npm install
```

## Usage

```bash
# Start server with default port (8080)
node src/index.js

# Custom port
node src/index.js --peerjs-port 9000
node src/index.js -p 9000

# Check port status
node src/index.js --check-port 8080
node src/index.js -c 8080
```

## Build

```bash
npm install -g pkg

# Windows
pkg . --output bilup-desktop-extras.exe --target node16-win-x64

# macOS
pkg . --output bilup-desktop-extras-macos --target node16-macos-x64

# Linux
pkg . --output bilup-desktop-extras-linux --target node16-linux-x64
```

## Command Line Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--peerjs-port` | `-p` | Server port | 8080 |
| `--check-port` | `-c` | Check port status and exit | - |