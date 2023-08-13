import { type Handle, error, redirect } from '@sveltejs/kit';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { getToken } from '$admin/utils';
import { jwt } from '$lib/authentication/jwt';
import {
  UPSTASH_REDIS_REST_TOKEN,
  UPSTASH_REDIS_REST_URL,
} from '$env/static/private';
import { dev } from '$app/environment';

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

  if (!dev) {
    const ip = event.getClientAddress();
    if (ip !== '127.0.0.1') {
      const redis = new Redis({
        url: UPSTASH_REDIS_REST_URL,
        token: UPSTASH_REDIS_REST_TOKEN,
      });
      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '10 s'),
      });
      const rateLimitAttempt = await ratelimit.limit(ip);
      if (!rateLimitAttempt.success) {
        const timeRemaining = Math.floor(
          (rateLimitAttempt.reset - new Date().getTime()) / 1000,
        );
        throw error(429, {
          message: `Too many requests. Please try again in ${timeRemaining} seconds.`,
        });
      }
    }
  }

  return resolve(event);
};
