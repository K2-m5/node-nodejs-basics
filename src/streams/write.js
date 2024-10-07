import { createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const filePath = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const writeStream = createWriteStream(filePath, { flags: 'a' });

    process.stdin.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Writing finished.');
    });

    writeStream.on('error', (err) => {
        console.error('Error writing to the file:', err.message);
    });
};

await write();