import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { validationErrorMessage } from '$lib/constants';
import { loginSchema } from '$lib/validation';
import { useRepository } from '$lib/server/repositories';
import { hash } from '$lib/authentication/hash';
import { jwt } from '$lib/authentication/jwt';
import { setToken } from '$admin/utils';

export const load = (async () => {
  const form = await superValidate(loginSchema);
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, loginSchema);
    if (!form.valid) {
      return message(form, validationErrorMessage);
    }

    const { email, password } = form.data;
    const repository = useRepository('admin');
    const loginData = await repository.getLoginData(email);

    if (loginData) {
      const { adminPassword, ...jwtData } = loginData;
      const passwordMatched = await hash.compare(password, adminPassword.password);
      if (passwordMatched) {
        const token = jwt.encode(jwtData);
        setToken(event, token);

        throw redirect(303, '/admin/auth/dashboard');
      }
    }

    return message(form, 'The email or password does not match');
  },
} satisfies Actions;
