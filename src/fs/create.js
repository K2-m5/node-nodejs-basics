import { promises as fs } from 'fs';
import { join } from 'path';
import { __dirname, ROOT_DIR_NAME } from './helpers.js';

const FILE_NAME = 'fresh.txt'

const create = async () => {
    const filePath = join(__dirname, ROOT_DIR_NAME, FILE_NAME);
    const fileContent = 'I am fresh and young';
    
    try {
        await fs.access(filePath);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(filePath, fileContent);
            console.log('File created successfully.');
        } else {
            throw err;
        }
    }
};

await create();
