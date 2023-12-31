import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { useRepository } from '$lib/server/repositories';
import { upsertAdminSchema } from '$lib/validation';
import { upsertAdmin } from '$admin/utils.server';

function isAdminExists() {
  const repository = useRepository('admin');
  return repository.getOne();
}

export async function load() {
  if (await isAdminExists()) {
    throw redirect(303, '/admin/guest/login');
  }

  const form = await superValidate(upsertAdminSchema);
  return { form };
}

export const actions = {
  default: async (event) => {
    if (await isAdminExists()) {
      throw error(401);
    }

    const form = await superValidate(event, upsertAdminSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    await upsertAdmin(form.data);

    throw redirect(303, '/admin/guest/login');
  },
};
