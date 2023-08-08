import { redirect } from '@sveltejs/kit';

export function load(event) {
  if (event.locals.admin) {
    throw redirect(303, '/admin/auth/dashboard');
  }
}
