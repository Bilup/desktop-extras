const fs = require('fs');
const path = require('path');

const version = process.argv[2];

if (!version) {
    console.error('Usage: node build/generate-release-body.js <version>');
    process.exit(1);
}

const descriptionPath = path.join(__dirname, 'description.md');
const outputPath = path.join(__dirname, 'release-body.md');

let changes = '';

if (fs.existsSync(descriptionPath)) {
    const content = fs.readFileSync(descriptionPath, 'utf-8');
    const sections = content.split(/^#\s+/m);
    
    for (const section of sections) {
        const lines = section.split('\n');
        const header = lines[0];
        if (header && header.trim() === version) {
            const body = lines.slice(1).join('\n').trim();
            if (body) {
                changes = `## What's Changed\n\n${body}\n\n`;
            }
            break;
        }
    }
}

const body = `${changes}## Downloads

| Platform | File |
|----------|------|
| Windows | bilup-desktop-extras-windows.exe |
| macOS | bilup-desktop-extras-macos |
| Linux | bilup-desktop-extras-linux |

## Usage

\`\`\`bash
# Windows
bilup-desktop-extras-windows.exe --peerjs-port 8080

# macOS/Linux
chmod +x bilup-desktop-extras-macos
./bilup-desktop-extras-macos --peerjs-port 8080
\`\`\``;

fs.writeFileSync(outputPath, body);
console.log(`Generated release body: ${outputPath}`);