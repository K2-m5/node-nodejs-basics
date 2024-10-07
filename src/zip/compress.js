import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const inputFilePath = join(__dirname, 'files', 'fileToCompress.txt');
const outputFilePath = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const readStream = createReadStream(inputFilePath);
    const gzipStream = createGzip();
    const writeStream = createWriteStream(outputFilePath);

    readStream.pipe(gzipStream).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Compression finished successfully.');
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file:', err.message);
    });
    gzipStream.on('error', (err) => {
        console.error('Error during compression:', err.message);
    });
    writeStream.on('error', (err) => {
        console.error('Error writing to the file:', err.message);
    });
};

await compress();