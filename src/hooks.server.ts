import { type Handle, redirect } from '@sveltejs/kit';
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

  if (!event.locals.admin && event.url.pathname.startsWith('/admin/auth')) {
    throw redirect(303, '/admin/guest/login');
  }

  return await resolve(event);
};
