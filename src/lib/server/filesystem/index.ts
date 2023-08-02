import { env } from 'node:process';
import sharp from 'sharp';
import { sThree } from './s-three';
import { local } from './local';

let filesystem = local;
if (env.FILESYSTEM_DISK === 'S3') {
  filesystem = sThree;
}

export async function uploadFile<T extends string, TType extends 'one' | 'many'>(
  name: T,
  formData: FormData,
  type: TType,
) {
  const files = getFiles(formData, name);

  if (files.length === 0) {
    return;
  }

  const links: string[] = [];
  for await (const file of files) {
    const { file: optimizedFile, name } = await optimizeFile(file);
    const link = await filesystem.store(optimizedFile, name);
    if (link) {
      links.push(link);
    }
  }

  // TODO: Provider placeholder image instead of empty string
  const result = {
    one: links[0] || '',
    many: links,
  };

  return result[type];
}

export function deleteFile(key?: string | null) {
  if (key) {
    return filesystem.destroy(key);
  }
}

function getFiles(formData: FormData, name: string) {
  return formData.getAll(name).filter((x) => x instanceof File && x.size > 0) as File[];
}

async function optimizeFile(file: File) {
  const input = await file.arrayBuffer();
  return { file: sharp(input).webp(), name: `${crypto.randomUUID()}.webp` };
}
