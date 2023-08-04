import type { PageServerLoad } from './$types';
import { useRepository } from '$lib/server/repositories';

export const load = (() => {
  return { products: useRepository('product').getAllById([1, 2, 3]) };
}) satisfies PageServerLoad;
