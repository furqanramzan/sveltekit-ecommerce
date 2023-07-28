import { error } from '@sveltejs/kit';

export function throwIfNotFound<T>(item: T | null) {
  if (!item) {
    throw error(404);
  }
  return item;
}
