import { promises as fs } from 'fs';
import { join } from 'path';
import { __dirname, ROOT_DIR_NAME } from './helpers.js';

const list = async () => {
    const folderPath = join(__dirname, ROOT_DIR_NAME);

    try {
        await fs.access(folderPath);

        const files = await fs.readdir(folderPath);

        console.log(files);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }};

await list();