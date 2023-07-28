import type { z } from 'zod';
import type { upsertAdminSchema } from '$lib/validation';
import { useRepository } from '$lib/server/repositories';
import { hash } from '$lib/authentication/hash';
import { throwIfNotFound } from '$lib/utils';

async function savePassword(adminId: number, password?: string) {
  if (password) {
    const adminPassword = useRepository('adminPassword');
    password = await hash.hash(password);
    await adminPassword.upsert({ password, adminId });
  }
}

export async function upsertAdmin(input: z.infer<typeof upsertAdminSchema>) {
  const repository = useRepository('admin');
  let admin: Awaited<ReturnType<typeof repository.create>>;

  const { id, password, ...values } = input;

  if (id) {
    const result = await repository.update(values, id);
    admin = throwIfNotFound(result);
  } else {
    admin = await repository.create(values);
  }

  await savePassword(admin.id, password);

  return admin;
}
