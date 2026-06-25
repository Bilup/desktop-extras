#!/usr/bin/env node

const PeerServer = require('peerjs-nodejs');
const os = require('os');

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

function main() {
    const options = parseArgs(process.argv.slice(2));
    const localIP = getLocalIP();
    
    const server = PeerServer({
        port: options.port,
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
    console.log(`  Port:        ${options.port}`);
    console.log(`  Path:        /peerjs`);
    console.log('========================================');
    console.log('  Clients can connect via:');
    console.log(`  host: "${localIP}", port: ${options.port}, path: "/peerjs"`);
    console.log('========================================');
    console.log('\nServer is running... (Press Ctrl+C to stop)\n');
}

main();