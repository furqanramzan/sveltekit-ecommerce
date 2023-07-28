import type { RequestEvent } from '@sveltejs/kit';
import { dev } from '$app/environment';

export function setToken(event: RequestEvent, token: string) {
  event.cookies.set('authorization', token, {
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

export function getToken(event: RequestEvent) {
  return event.cookies.get('authorization');
}

export function removeToken(event: RequestEvent) {
  event.cookies.set('authorization', '', {
    path: '/',
    expires: new Date(0),
  });
}
