import { fail, redirect } from '@sveltejs/kit';

import { ADMIN_ID, ADMIN_PASSWORD } from '$env/static/private';

export const actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();

    const userId = formData.get('userId');
    const password = formData.get('password');

    if (userId === ADMIN_ID && password === ADMIN_PASSWORD) {
      cookies.set('adminLoggedIn', 'true', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 60 * 60
      });

      redirect(303, '/dashboard');
    }

    return fail(401, {
      message: 'Invalid admin ID or password'
    });
  }
};