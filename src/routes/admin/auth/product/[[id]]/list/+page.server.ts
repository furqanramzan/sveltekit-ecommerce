import type { Actions, PageServerLoad } from './$types';
import { useRepository } from '$lib/server/repositories';
import { formatListParams, formatListResponse } from '$lib/utils/list';
import { throwIfNotFound } from '$lib/utils';
import { deleteFile } from '$lib/server/filesystem';
import { categories, products } from '$lib/server/dummy';

const repository = useRepository('product');

export const load = (async (event) => {
  const params = formatListParams(event);

  const items = await repository.getPaginatedItems(params);

  const data = formatListResponse(items);

  return { data };
}) satisfies PageServerLoad;

export const actions = {
  destroy: async (event) => {
    const id = Number(event.params.id);
    if (id) {
      const { image } = throwIfNotFound(await repository.getOne(id));
      await deleteFile(image);
      return throwIfNotFound(await repository.destroy(id));
    }
  },
  dummy: async () => {
    const items = await categories();
    await products(items);
  },
} satisfies Actions;
