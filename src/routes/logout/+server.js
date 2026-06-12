import { redirect } from "@sveltejs/kit";

export const GET = async ({ cookies }) => {
  cookies.delete("adminLoggedIn", {
    path: "/"
  });

  throw redirect(303, "/auth");
};