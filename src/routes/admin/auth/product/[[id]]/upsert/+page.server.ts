import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { upsertProductSchema } from '$lib/server/validation';
import { useRepository } from '$lib/server/repositories';
import { throwIfNotFound } from '$lib/utils';
import { deleteFile, uploadFile } from '$lib/server/filesystem';

const repository = useRepository('product');
const categoryRepository = useRepository('category');

export async function load(event) {
  const categories = await categoryRepository.getManyWithName();

  const form = await superValidate(upsertProductSchema);

  const id = Number(event.params.id);
  if (id) {
    const item = await repository.getOne(id);
    return { item, form, categories };
  }

  return { form, categories };
}

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const id = Number(event.params.id);
    if (id) {
      formData.append('id', String(id));
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
      if (form.data.image) {
        const { image } = throwIfNotFound(await repository.getOne(id));
        await deleteFile(image);
      }

      throwIfNotFound(await repository.update(form.data, id));
    } else {
      await repository.create(form.data);
    }

    throw redirect(303, '/admin/auth/product/list');
  },
};
