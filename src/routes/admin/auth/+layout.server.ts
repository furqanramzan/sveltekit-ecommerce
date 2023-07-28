import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = ((event) => {
  if (!event.locals.admin) {
    throw redirect(303, '/admin/guest/login');
  }
}) satisfies LayoutServerLoad;
