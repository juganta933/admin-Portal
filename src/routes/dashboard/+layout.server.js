import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, url }) => {
  const isAdmin = cookies.get("adminLoggedIn");

  if (!isAdmin) {
    throw redirect(303, `/auth?redirectTo=${url.pathname}`);
  }

  return {
    isAdmin: true
  };
};