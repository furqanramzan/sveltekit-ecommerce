import { z } from 'zod';
import type { RequestEvent } from '@sveltejs/kit';

const limit = 20;

export const listSchema = z.object({
  page: z.coerce.number().optional(),
});

export function formatListParams(event: RequestEvent) {
  let page = Number(event.url.searchParams.get('page'));
  page = page > 0 ? page : 1;

  const offset = (page - 1) * limit;

  return { limit, offset };
}

interface Params<TData> {
  items: TData;
  total?: number;
}
export function formatListResponse<T>({ items, total }: Params<T>) {
  let totalPages = 0;

  if (total) {
    totalPages = Math.ceil(total / limit);
  }

  return { items, totalPages };
}
