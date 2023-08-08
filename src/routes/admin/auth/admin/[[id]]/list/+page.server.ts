import { useRepository } from '$lib/server/repositories';
import { formatListParams, formatListResponse } from '$lib/utils/list';
import { throwIfNotFound } from '$lib/utils';

const repository = useRepository('admin');

export async function load(event) {
  const params = formatListParams(event);

  const items = await repository.getMany(params);

  const data = formatListResponse(items);

  return { data };
}

export const actions = {
  destroy: async (event) => {
    const id = Number(event.params.id);
    if (id) {
      const result = await repository.destroy(id);
      return throwIfNotFound(result);
    }
  },
};
