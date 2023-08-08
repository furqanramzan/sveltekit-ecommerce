import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { upsertAdminSchema } from '$lib/server/validation';
import { useRepository } from '$lib/server/repositories';
import { upsertAdmin } from '$admin/utils.server';

const repository = useRepository('admin');

export async function load(event) {
  const form = await superValidate(upsertAdminSchema);

  const id = Number(event.params.id);
  if (id) {
    const item = await repository.getOne(id);
    return {
      item,
      form,
    };
  }

  return { form };
}

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const { id } = event.params;
    if (id) {
      formData.append('id', id);
    }
    const form = await superValidate(formData, upsertAdminSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    await upsertAdmin(form.data);

    throw redirect(303, '/admin/auth/admin/list');
  },
};
