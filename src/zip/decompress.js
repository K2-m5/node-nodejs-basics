import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const inputFilePath = join(__dirname, 'files', 'archive.gz');
const outputFilePath = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    const readStream = createReadStream(inputFilePath);
    const gunzipStream = createGunzip();
    const writeStream = createWriteStream(outputFilePath);

    readStream.pipe(gunzipStream).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Decompression finished successfully.');
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file:', err.message);
    });
    gunzipStream.on('error', (err) => {
        console.error('Error during decompression:', err.message);
    });
    writeStream.on('error', (err) => {
        console.error('Error writing to the file:', err.message);
    });
};

await decompress();