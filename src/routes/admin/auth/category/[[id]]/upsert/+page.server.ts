import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { upsertCategorySchema } from '$lib/server/validation';
import { useRepository } from '$lib/server/repositories';
import { throwIfNotFound } from '$lib/utils';
import { deleteFile, uploadFile } from '$lib/server/filesystem';

const repository = useRepository('category');

export async function load(event) {
  const form = await superValidate(upsertCategorySchema);

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
    const id = Number(event.params.id);
    if (id) {
      formData.append('id', String(id));
    }
    const form = await superValidate(formData, upsertCategorySchema);
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
      if (form.data.image) {
        const { image } = throwIfNotFound(await repository.getOne(id));
        await deleteFile(image);
      }

      throwIfNotFound(await repository.update(form.data, id));
    } else {
      await repository.create(form.data);
    }

    throw redirect(303, '/admin/auth/category/list');
  },
};
