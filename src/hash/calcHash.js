import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const stream = createReadStream(filePath);

    const hash = createHash('sha256');

    stream.on('data', (chunk) => {
        hash.update(chunk);
    });

    stream.on('end', () => {
        const result = hash.digest('hex');
        console.log(`SHA256 Hash: ${result}`);
    });

    stream.on('error', (err) => {
        console.error('Error reading the file:', err);
    });
};

await calculateHash();