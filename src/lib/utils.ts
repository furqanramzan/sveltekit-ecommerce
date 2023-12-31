import { error } from '@sveltejs/kit';
import { PUBLIC_APP_NAME } from '$env/static/public';

export function throwIfNotFound<T>(item?: T | null) {
  if (!item) {
    throw error(404);
  }
  return item;
}

export function getParamsString(
  searchParams: URLSearchParams,
  removeParams?: string[],
  addParams?: Record<string, string>,
) {
  let allParams = Object.fromEntries(searchParams);
  if (removeParams) {
    for (const param of removeParams) {
      delete allParams[param];
    }
  }
  if (addParams) {
    allParams = { ...allParams, ...addParams };
  }
  return new URLSearchParams(allParams).toString();
}

export function getTitle(title?: string) {
  return title ? `${PUBLIC_APP_NAME} | ${title}` : PUBLIC_APP_NAME;
}
