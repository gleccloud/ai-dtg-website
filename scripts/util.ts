import fs from 'fs/promises';

export async function writeJsonAtomic(filePath: string, data: any) {
	const tmp = `${filePath}.tmp`;
	await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf-8');
	await fs.rename(tmp, filePath);
}
