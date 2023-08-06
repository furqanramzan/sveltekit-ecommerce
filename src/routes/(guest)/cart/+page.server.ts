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
  // const total = products.reduce((acc, product) => acc + product.price, 0);

  const productIdQuantity = products.map(({ id }) => ({
    id,
    quantity: cart.get(id) || 1,
  }));
  const form = await superValidate(
    { products: productIdQuantity },
    updateCartSchema,
  );

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
    form.data.products.forEach(({ id, quantity }) => cart.set(id, quantity));
    setCart(event, cart);
  },
} satisfies Actions;
