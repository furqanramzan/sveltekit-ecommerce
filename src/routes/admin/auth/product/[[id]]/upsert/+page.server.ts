import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { upsertProductSchema } from '$lib/server/validation';
import { useRepository } from '$lib/server/repositories';
import { throwIfNotFound } from '$lib/utils';
import { uploadFile } from '$lib/server/upload-file';

const repository = useRepository('product');

export const load = (async (event) => {
  const form = await superValidate(upsertProductSchema);

  const id = Number(event.params.id);
  if (id) {
    const item = await repository.getOne(id);
    return {
      item,
      form,
    };
  }

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const { id } = event.params;
    if (id) {
      formData.append('id', id);
    }
    const form = await superValidate(formData, upsertProductSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    const image = await uploadFile('image', formData, 'one');
    if (image) {
      form.data.image = image;
    } else if (!id) {
      form.errors.image = ['Required'];
      return fail(400, { form });
    }

    if (id) {
      const result = await repository.update(form.data, Number(id));
      throwIfNotFound(result);
    } else {
      await repository.create(form.data);
    }

    throw redirect(303, '/admin/auth/product/list');
  },
} satisfies Actions;
