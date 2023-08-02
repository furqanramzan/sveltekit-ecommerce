import type { PageServerLoad } from './$types';
import { useRepository } from '$lib/server/repositories';
import { formatListParams, formatListResponse } from '$lib/utils/list';

export const load = (async (event) => {
  const getCategories = async () => {
    const repository = useRepository('category');
    return repository.getManyWithName();
  };

  const getProducts = async () => {
    const repository = useRepository('product');
    const params = formatListParams(event);
    const items = await repository.getMany(params);
    return formatListResponse(items);
  };

  return { categories: getCategories(), products: getProducts() };
}) satisfies PageServerLoad;
