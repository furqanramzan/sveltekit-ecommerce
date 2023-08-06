import { superValidate } from 'sveltekit-superforms/server';
import { type RequestEvent, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { useRepository } from '$lib/server/repositories';
import { createOrderSchema } from '$lib/validation';
import { getCart, removeCart } from '$guest/utils';

function throwIfCartEmpty(event: RequestEvent) {
  const cart = getCart(event);
  if (cart.size === 0) {
    throw redirect(303, '/cart');
  }
  return cart;
}

export const load = (async (event) => {
  const cart = throwIfCartEmpty(event);
  const products = await useRepository('product').getAllById(
    Array.from(cart.keys()),
  );

  const form = await superValidate(createOrderSchema);

  return {
    form,
    cart,
    products,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, createOrderSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    const cart = throwIfCartEmpty(event);
    const products = await useRepository('product').getAllById(
      Array.from(cart.keys()),
    );
    const total = products.reduce(
      (total, product) => total + product.price * (cart.get(product.id) || 1),
      0,
    );

    const { id: orderId } = await useRepository('order').create({
      ...form.data,
      total,
    });
    await useRepository('productToOrder').create(
      products.map(({ id: productId }) => ({
        productId,
        orderId,
      })),
    );

    removeCart(event);

    throw redirect(303, '/');
  },
} satisfies Actions;
