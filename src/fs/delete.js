import { promises as fs } from 'node:fs';
import { join } from 'path';
import { __dirname, ROOT_DIR_NAME } from './helpers.js';

const DELETE_NAME = 'fileToRemove.txt'

console.log(__dirname);

const remove = async () => {
    const filePath = join(__dirname, ROOT_DIR_NAME, DELETE_NAME);

    try {
        await fs.access(filePath);

        await fs.unlink(filePath);
        console.log('File deleted successfully.');
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await remove();