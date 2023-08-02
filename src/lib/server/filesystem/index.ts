import { env } from 'node:process';
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
  const files = formData.getAll(name).filter((x) => x instanceof File && x.size > 0) as File[];

  if (files.length === 0) {
    return;
  }

  const links: string[] = [];
  for await (const file of files) {
    const link = await filesystem.store(file);
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
