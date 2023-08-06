import { superValidate } from 'sveltekit-superforms/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { addToCartSchema } from '$lib/validation';
import { useRepository } from '$lib/server/repositories';
import { throwIfNotFound } from '$lib/utils';
import { getCart, setCart } from '$guest/utils';

const repository = useRepository('product');

export const load = (async (event) => {
  const id = Number(event.params.id);

  const getForm = () => superValidate({ quantity: 1 }, addToCartSchema);

  const getProduct = async () => {
    const product = await repository.getOneForDetail(id);
    return throwIfNotFound(product);
  };

  const isInCart = () => {
    const cart = getCart(event);
    return cart.has(id);
  };

  return {
    form: getForm(),
    product: getProduct(),
    isInCart: isInCart(),
  };
}) satisfies PageServerLoad;

export const actions = {
  add: async (event) => {
    const form = await superValidate(event, addToCartSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    const id = Number(event.params.id);
    const quantity = form.data.quantity;
    const inStock = await repository.isInStock(id, quantity);
    if (inStock) {
      const cart = getCart(event);
      cart.set(id, quantity);
      setCart(event, cart);
      throw redirect(303, '/cart');
    }
  },

  remove: (event) => {
    const cart = getCart(event);
    cart.delete(Number(event.params.id));
    setCart(event, cart);
    throw redirect(303, '/cart');
  },
} satisfies Actions;
