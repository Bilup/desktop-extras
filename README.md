# Bilup Desktop Extras

Extra tools for Bilup Desktop.

## PeerJS Server

A lightweight PeerJS signaling server for local network communication, perfect for school computer labs and local development environments.

## Features

- **Auto-detect Local IP**: Automatically detects and displays your LAN IP address
- **Custom Port**: Supports custom port configuration via command line arguments
- **Cross-platform**: Available for Windows, macOS, and Linux
- **No Installation Required**: Pre-built executables run without Node.js
- **Zero Configuration**: Works out of the box with sensible defaults

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/your-username/desktop-extras.git
cd desktop-extras

# Install dependencies
npm install

# Run globally (optional)
npm install -g .
```

### Download Pre-built Executables

Download the latest executables from the [GitHub Actions Artifacts](https://github.com/your-username/desktop-extras/actions):

- **Windows**: `bilup-desktop-extras.exe`
- **macOS**: `bilup-desktop-extras-macos`
- **Linux**: `bilup-desktop-extras-linux`

## Usage

### Basic Usage

Start the server with default port (8080):

```bash
# Windows
bilup-desktop-extras.exe

# macOS/Linux
./bilup-desktop-extras-macos
# or
./bilup-desktop-extras-linux
```

### Custom Port

Specify a custom port using `--peerjs-port` or `-p`:

```bash
# Windows
bilup-desktop-extras.exe --peerjs-port 9000

# macOS/Linux
./bilup-desktop-extras-macos --peerjs-port 9000
# or
./bilup-desktop-extras-macos -p 9000
```

### Output Example

```
========================================
  Bilup Desktop Extras - PeerJS Server
========================================
  Local IP:    192.168.1.100
  Port:        8080
  Path:        /peerjs
========================================
  Clients can connect via:
  host: "192.168.1.100", port: 8080, path: "/peerjs"
========================================

Server is running... (Press Ctrl+C to stop)
```

## Client Connection

### JavaScript/TypeScript

```javascript
import Peer from 'peerjs';

const peer = new Peer({
  host: '192.168.1.100',  // Replace with server's IP
  port: 8080,
  path: '/peerjs'
});

peer.on('open', (id) => {
  console.log('My peer ID is: ' + id);
});

peer.on('connection', (conn) => {
  conn.on('data', (data) => {
    console.log('Received:', data);
  });
});

// Connect to another peer
const conn = peer.connect('another-peer-id');
conn.on('open', () => {
  conn.send('Hello!');
});
```

### HTML (Browser)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js"></script>
</head>
<body>
  <script>
    const peer = new Peer({
      host: '192.168.1.100',  // Replace with server's IP
      port: 8080,
      path: '/peerjs'
    });

    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });
  </script>
</body>
</html>
```

## Building from Source

### Prerequisites

- Node.js 16 or higher
- npm

### Build Steps

```bash
# Install dependencies
npm install

# Install pkg globally
npm install -g pkg

# Build for Windows
pkg . --output bilup-desktop-extras.exe --target node16-win-x64

# Build for macOS
pkg . --output bilup-desktop-extras-macos --target node16-macos-x64

# Build for Linux
pkg . --output bilup-desktop-extras-linux --target node16-linux-x64
```

## GitHub Actions

This project uses GitHub Actions to automatically build executables for all platforms on every push to the `main` branch.

### Manual Build

You can also trigger a build manually:

1. Go to the **Actions** tab in your GitHub repository
2. Select the **Build** workflow
3. Click **Run workflow**
4. (Optional) Enter a custom default port
5. Click **Run workflow**

### Download Artifacts

After a successful build, download the executables from the workflow's **Artifacts** section.

## Command Line Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--peerjs-port` | `-p` | Port number for the PeerJS server | 8080 |

## Troubleshooting

### Port Already in Use

If you see an error about the port being in use:

```bash
# Check what's using the port (Linux/macOS)
lsof -i :8080

# Check what's using the port (Windows)
netstat -ano | findstr :8080
```

### Firewall Issues

Make sure your firewall allows incoming connections on the specified port.

### macOS Security Warning

On macOS, you may see a security warning when running the downloaded executable:

1. Open **System Preferences** > **Security & Privacy**
2. Click **Open Anyway** for the application
3. Or run: `xattr -d com.apple.quarantine bilup-desktop-extras-macos`
