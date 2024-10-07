import { promises as fs } from 'fs';
import { join } from 'path';
import { __dirname, ROOT_DIR_NAME } from './helpers.js';

const FILE_READ = 'fileToRead.txt'

const read = async () => {
    const filePath = join(__dirname, ROOT_DIR_NAME, FILE_READ);

    try {
        await fs.access(filePath);

        const content = await fs.readFile(filePath, 'utf-8');

        console.log(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }};

await read();