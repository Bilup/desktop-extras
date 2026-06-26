#!/usr/bin/env node

const { PeerServer } = require('peer');
const os = require('os');
const net = require('net');

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

function parseArgs(args) {
    const options = {
        port: 8080
    };
    
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--peerjs-port' || args[i] === '-p') {
            const port = parseInt(args[i + 1]);
            if (!isNaN(port) && port > 0 && port <= 65535) {
                options.port = port;
                i++;
            }
        }
    }
    
    return options;
}

function checkPort(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', () => resolve(false));
        server.once('listening', () => {
            server.close();
            resolve(true);
        });
        server.listen(port);
    });
}

async function findAvailablePort(startPort) {
    let port = startPort;
    const maxRetries = 100;
    const maxPort = 65535;
    
    for (let i = 0; i < maxRetries && port <= maxPort; i++) {
        const isAvailable = await checkPort(port);
        if (isAvailable) {
            return port;
        }
        if (i === 0) {
            console.error(`\nPort ${startPort} is already in use, trying next available port...`);
        }
        port++;
    }
    
    return null;
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    const localIP = getLocalIP();
    
    const availablePort = await findAvailablePort(options.port);
    
    if (!availablePort) {
        console.error('\n❌ Failed to find an available port after 100 attempts.');
        console.error('Please specify a different port using --peerjs-port or -p');
        process.exit(1);
    }
    
    if (availablePort !== options.port) {
        console.log(`\n✅ Using port ${availablePort} (port ${options.port} was in use)`);
    }
    
    const server = PeerServer({
        port: availablePort,
        path: '/peerjs',
        allow_discovery: true
    });
    
    server.on('connection', (client) => {
        console.log(`Peer connected: ${client.getId()}`);
    });
    
    server.on('disconnect', (client) => {
        console.log(`Peer disconnected: ${client.getId()}`);
    });
    
    console.log('\n========================================');
    console.log('  Bilup Desktop Extras - PeerJS Server');
    console.log('========================================');
    console.log(`  Local IP:    ${localIP}`);
    console.log(`  Port:        ${availablePort}`);
    console.log(`  Path:        /peerjs`);
    console.log('========================================');
    console.log('  Clients can connect via:');
    console.log(`  host: "${localIP}", port: ${availablePort}, path: "/peerjs"`);
    console.log('========================================');
    console.log('\nServer is running... (Press Ctrl+C to stop)\n');
}

main();