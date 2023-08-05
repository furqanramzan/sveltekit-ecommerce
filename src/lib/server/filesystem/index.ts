import { env } from 'node:process';
import sharp, { type ResizeOptions, type Sharp } from 'sharp';
import { sThree } from './s-three';
import { local } from './local';

let filesystem = local;
if (env.FILESYSTEM_DISK === 'S3') {
  filesystem = sThree;
}

const resizes: Record<'product' | 'category', ResizeOptions> = {
  product: {
    width: 320,
    height: 288,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
  category: {
    width: 48,
    height: 48,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
};

export async function uploadSharp<T extends keyof typeof resizes>(
  file: Sharp,
  resize?: T,
) {
  if (resize) {
    file.resize(resizes[resize]);
  }
  const link = await filesystem.store(
    file.webp(),
    `${crypto.randomUUID()}.webp`,
  );
  return link || '';
}

export async function uploadFile<
  T extends string,
  TType extends 'one' | 'many',
>(name: T, formData: FormData, type: TType) {
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
  return formData
    .getAll(name)
    .filter((x) => x instanceof File && x.size > 0) as File[];
}

async function optimizeFile(file: File) {
  const input = await file.arrayBuffer();
  return { file: sharp(input).webp(), name: `${crypto.randomUUID()}.webp` };
}
