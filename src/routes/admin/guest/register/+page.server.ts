import { error, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { validationErrorMessage } from '$lib/constants';
import { useRepository } from '$lib/server/repositories';
import { upsertAdminSchema } from '$lib/validation';
import { upsertAdmin } from '$admin/utils.server';

function isAdminExists() {
  const repository = useRepository('admin');
  return repository.getOne();
}

export const load = (async () => {
  if (await isAdminExists()) {
    throw redirect(303, '/admin/guest/login');
  }

  const form = await superValidate(upsertAdminSchema);
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    if (await isAdminExists()) {
      throw error(401);
    }

    const form = await superValidate(event, upsertAdminSchema);
    if (!form.valid) {
      return message(form, validationErrorMessage);
    }

    await upsertAdmin(form.data);

    throw redirect(303, '/admin/guest/login');
  },
} satisfies Actions;
