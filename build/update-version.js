const fs = require('fs');
const path = require('path');

const version = process.argv[2];

if (!version) {
    console.error('Usage: node build/update-version.js <version>');
    process.exit(1);
}

const versionJsonPath = path.join(__dirname, 'version.json');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageLockJsonPath = path.join(__dirname, '..', 'package-lock.json');

const versionJson = {
    version: version
};

fs.writeFileSync(versionJsonPath, JSON.stringify(versionJson, null, 4) + '\n');
console.log(`Updated ${versionJsonPath}: ${version}`);

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
packageJson.version = version;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Updated ${packageJsonPath}: ${version}`);

if (fs.existsSync(packageLockJsonPath)) {
    const packageLockJson = JSON.parse(fs.readFileSync(packageLockJsonPath, 'utf-8'));
    packageLockJson.version = version;
    if (packageLockJson.packages && packageLockJson.packages['']) {
        packageLockJson.packages[''].version = version;
    }
    fs.writeFileSync(packageLockJsonPath, JSON.stringify(packageLockJson, null, 2) + '\n');
    console.log(`Updated ${packageLockJsonPath}: ${version}`);
}