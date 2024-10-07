import { promises as fs } from 'node:fs';
import { join } from 'path';
import { __dirname, ROOT_DIR_NAME } from './helpers.js';

const OLD_NAME = 'wrongFilename.txt'
const NEW_NAME = 'properFilename.md'

const rename = async () => {
    const oldFilePath = join(__dirname, ROOT_DIR_NAME, OLD_NAME)
    const newFilePath = join(__dirname, ROOT_DIR_NAME, NEW_NAME)

    try {
        await fs.access(oldFilePath);

        try {
            await fs.access(newFilePath);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        await fs.rename(oldFilePath, newFilePath);
        console.log('File renamed successfully.');
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    } 
};

await rename();