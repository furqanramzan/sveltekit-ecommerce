import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { useRepository } from '$lib/server/repositories';
import { updateCartSchema } from '$lib/validation';
import { getCart, setCart } from '$guest/utils';

export const load = (async (event) => {
  const cart = getCart(event);
  const repository = useRepository('product');
  let products: Awaited<ReturnType<typeof repository.getAllById>> = [];

  if (cart.size > 0) {
    products = await repository.getAllById(Array.from(cart.keys()));
  }

  const product: number[] = [];
  const quantity: number[] = [];
  products.forEach(({ id }) => {
    product.push(id);
    quantity.push(cart.get(id) || 1);
  });
  const form = await superValidate({ product, quantity }, updateCartSchema);

  return {
    form,
    products,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, updateCartSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    const cart = new Map();
    form.data.product.forEach((id, index) =>
      cart.set(id, form.data.quantity[index]),
    );
    setCart(event, cart);
  },
} satisfies Actions;
