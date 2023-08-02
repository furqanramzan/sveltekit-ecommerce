import { unlink, writeFile } from 'node:fs/promises';
import promise from '$lib/utils/promise';

export async function store(file: File) {
  const fileUrl = `uploads/${Date.now()}-${file.name}`;
  const buffer = await file.arrayBuffer();
  const writePromise = await promise(() => writeFile(fileUrl, new Uint8Array(buffer)), true);
  if (writePromise.success) {
    return `/${fileUrl}`;
  }
}

export async function destroy(key: string) {
  key = key.substring(1);
  await promise(() => unlink(key));
}

export class Local {
  store = store;
  destroy = destroy;
}

export const local = new Local();
