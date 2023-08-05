import { unlink, writeFile } from 'node:fs/promises';
import type { Sharp } from 'sharp';
import promise from '$lib/utils/promise';

export async function store(file: File | Sharp, name: string) {
  const uploadDirectory = 'uploads';
  const filePath = `${uploadDirectory}/${name}`;
  let writePromise: Awaited<ReturnType<typeof promise>>;

  if (file instanceof File) {
    const buffer = await file.arrayBuffer();
    writePromise = await promise(
      () => writeFile(filePath, new Uint8Array(buffer)),
      true,
    );
  } else {
    writePromise = await promise(() => file.toFile(filePath), true);
  }

  if (writePromise.success) {
    return `/${filePath}`;
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
