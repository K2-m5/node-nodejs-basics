import { promises as fs } from 'node:fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const copy = async () => {
    const srcFolder = join(__dirname, 'files');
    const destFolder = join(__dirname, 'files_copy');

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
