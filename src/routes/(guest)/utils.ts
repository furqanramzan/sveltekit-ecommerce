import type { RequestEvent } from '@sveltejs/kit';
import { dev } from '$app/environment';

type CartMap = Map<number, number>;

export function setCart(event: RequestEvent, cart: CartMap) {
  event.cookies.set('cart', JSON.stringify([...cart]), {
    // send cookie for every page
    path: '/',
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: 'strict',
    // only sent over HTTPS in production
    secure: dev,
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function getCart(event: RequestEvent) {
  let cartMap: CartMap = new Map();
  const cart = event.cookies.get('cart');

  if (cart) {
    try {
      cartMap = new Map(JSON.parse(cart));
    } catch (error) {
      removeCart(event);
    }
  }

  return cartMap;
}

export function removeCart(event: RequestEvent) {
  event.cookies.set('cart', '', {
    path: '/',
    expires: new Date(0),
  });
}
