import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { validationErrorMessage } from '$lib/constants';
import { upsertAdminSchema } from '$lib/validation';
import { upsertAdmin } from '$admin/utils.server';

export const load = (async () => {
  const form = await superValidate(upsertAdminSchema);
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, upsertAdminSchema);
    if (!form.valid) {
      return message(form, validationErrorMessage);
    }

    await upsertAdmin(form.data);
  },
} satisfies Actions;
