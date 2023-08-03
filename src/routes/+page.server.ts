import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { useRepository } from '$lib/server/repositories';
import { formatListParams, formatListResponse } from '$lib/utils/list';

const filterSchema = z.object({
  category: z.coerce.number().optional(),
});

export const load = (async (event) => {
  const filters = filterSchema.parse(Object.fromEntries(event.url.searchParams));

  const getCategories = async () => {
    const repository = useRepository('category');
    return repository.getManyWithName();
  };

  const getProducts = async () => {
    const repository = useRepository('product');
    const params = formatListParams(event);
    const items = await repository.getManyWithFilter(params, filters);
    return formatListResponse(items);
  };

  return { categories: getCategories(), products: getProducts() };
}) satisfies PageServerLoad;
