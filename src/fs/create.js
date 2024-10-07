import { promises as fs } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');
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
