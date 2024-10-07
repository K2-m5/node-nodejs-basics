import { createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const filePath = join(__dirname, 'files', 'fileToRead.txt');


const read = async () => {
    const readStream = createReadStream(filePath, 'utf-8');

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file:', err.message);
    });

    readStream.on('open', () => {
        console.log('Stream opened successfully');
    });

    readStream.on('end', () => {
        console.log('\nReading finished.');
    });
};

await read();