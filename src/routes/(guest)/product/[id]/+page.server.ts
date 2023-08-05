import { superValidate } from 'sveltekit-superforms/client';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { addToCartSchema } from '$lib/validation';
import { useRepository } from '$lib/server/repositories';
import { throwIfNotFound } from '$lib/utils';

export const load = (async (event) => {
  const getForm = () => superValidate({ quantity: 1 }, addToCartSchema);

  const getProduct = async () => {
    const product = await useRepository('product').getOneForDetail(
      Number(event.params.id),
    );
    return throwIfNotFound(product);
  };
  return {
    form: getForm(),
    product: getProduct(),
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, addToCartSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
  },
} satisfies Actions;
