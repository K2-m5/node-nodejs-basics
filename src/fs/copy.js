import { promises as fs } from 'node:fs';
import { join } from 'path';
import { __dirname, ROOT_DIR_NAME } from './helpers.js';

const ROOT_DEST_DIR = 'files_copy'

const copy = async () => {
    const srcFolder = join(__dirname, ROOT_DIR_NAME);
    const destFolder = join(__dirname, ROOT_DEST_DIR);

    try {
        await fs.access(srcFolder);

        try {
            await fs.access(destFolder);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        await fs.cp(srcFolder, destFolder, { recursive: true });
        console.log('Folder copied successfully.');
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};
await copy();
