import type { Handle } from '@sveltejs/kit';
import { getToken } from '$admin/utils';
import { jwt } from '$lib/authentication/jwt';

export const handle: Handle = async ({ event, resolve }) => {
  const token = getToken(event);

  if (token) {
    const admin = jwt.verifyAndDecode(token);
    if (admin) {
      event.locals.admin = admin;
    }
  }

  return await resolve(event);
};
