import { fail, redirect } from "@sveltejs/kit";
import { connectDB } from "$lib/server/db.js";
import Blog from "$lib/server/models/blogs.js";
import { uploadImage } from "$lib/server/cloudinary.js";

export async function load() {
  await connectDB();

  const blogs = await Blog.find().sort({ createdAt: -1 });

  return {
    blogs: JSON.parse(JSON.stringify(blogs))
  };
}

export const actions = {
addBlog: async ({ request }) => {
  await connectDB();

  const formData = await request.formData();

  const title = formData.get("title");
  const category = formData.get("category");
  const author = formData.get("author") || "";
  const description = formData.get("description");
  const imageFile = formData.get("imageFile");
  const date = formData.get("date") || new Date().toISOString().split("T")[0];
  const status = formData.get("status") || "Draft";

  if (!title || !category || !author || !description) {
    return fail(400, {
      error: "Title, category, author, and description are required."
    });
  }

  if (!imageFile || imageFile.size === 0) {
    return fail(400, {
      error: "Please upload a blog image."
    });
  }

  let image = "";

  try {
    image = await uploadImage(imageFile, "ml-club/blogs");
  } catch (error) {
    return fail(400, {
      error: error.message || "Image upload failed."
    });
  }

  await Blog.create({
    title,
    category,
    author,
    description,
    image,
    date,
    status
  });

  throw redirect(303, "/dashboard/blogs");
},

  updateBlog: async ({ request }) => {
  await connectDB();

  const formData = await request.formData();

  const id = formData.get("id");
  const title = formData.get("title");
  const category = formData.get("category");
  const author = formData.get("author") || "";
  const description = formData.get("description");
  const oldImage = formData.get("oldImage") || "";
  const imageFile = formData.get("imageFile");
  const date = formData.get("date") || new Date().toISOString().split("T")[0];
  const status = formData.get("status") || "Draft";

  if (!id) {
    return fail(400, {
      error: "Blog ID is required."
    });
  }

  if (!title || !category || !author || !description) {
    return fail(400, {
      error: "Title, category, author, and description are required."
    });
  }

  if (!oldImage && (!imageFile || imageFile.size === 0)) {
    return fail(400, {
      error: "Please upload a blog image."
    });
  }

  let image = oldImage;

  try {
    if (imageFile && imageFile.size > 0) {
      image = await uploadImage(imageFile, "ml-club/blogs");
    }
  } catch (error) {
    return fail(400, {
      error: error.message || "Image upload failed."
    });
  }

  await Blog.findByIdAndUpdate(id, {
    title,
    category,
    author,
    description,
    image,
    date,
    status
  });

  throw redirect(303, "/dashboard/blogs");
},

  deleteBlog: async ({ request }) => {
    await connectDB();

    const formData = await request.formData();

    const id = formData.get("id");

    if (!id) {
      return fail(400, {
        error: "Blog ID is required"
      });
    }

    await Blog.findByIdAndDelete(id);

    throw redirect(303, "/dashboard/blogs");
  }
};