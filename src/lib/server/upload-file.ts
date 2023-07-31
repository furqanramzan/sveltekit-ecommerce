import { store } from './s-three';

export async function uploadFile<T extends string, TType extends 'one' | 'many'>(
  name: T,
  formData: FormData,
  type: TType,
) {
  const files = formData.getAll(name).filter((x) => x instanceof File && x.size > 0) as File[];

  if (files.length === 0) {
    return;
  }

  const uploadedFiles: string[] = [];
  for await (const file of files) {
    const uploadedFile = await store(file);
    if (uploadedFile.success && uploadedFile.data.Location) {
      uploadedFiles.push(uploadedFile.data.Location);
    }
  }

  const result = {
    one: uploadedFiles[0],
    many: uploadedFiles,
  };

  return result[type];
}
