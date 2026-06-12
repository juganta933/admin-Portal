import { fail, redirect } from "@sveltejs/kit";
import { connectDB } from "$lib/server/db.js";
import Project from "$lib/server/models/project.js";
import { uploadImage } from "$lib/server/cloudinary.js";
function isValidUrl(value) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function load() {
  await connectDB();

  const projects = await Project.find().sort({ createdAt: -1 });

  return {
    projects: JSON.parse(JSON.stringify(projects))
  };
}

function convertTechStack(techStack) {
  if (!techStack) return [];

  return techStack
    .split(",")
    .map((tech) => tech.trim())
    .filter((tech) => tech.length > 0);
}

export const actions = {
 addProject: async ({ request }) => {
  await connectDB();

  const formData = await request.formData();

  const title = formData.get("title");
  const category = formData.get("category");
  const description = formData.get("description");
  const imageFile = formData.get("imageFile");
  const techStack = formData.get("techStack") || "";
  const github = formData.get("github") || "";
  const live = formData.get("live") || "";

  if (!title || !category || !description) {
    return fail(400, {
      error: "Title, category, and description are required."
    });
  }

  if (!imageFile || imageFile.size === 0) {
    return fail(400, {
      error: "Please upload a project image."
    });
  }

  if (!github) {
    return fail(400, {
      error: "GitHub URL is required."
    });
  }

  if (!isValidUrl(github)) {
    return fail(400, {
      error: "Please enter a valid GitHub URL."
    });
  }

  if (!live) {
    return fail(400, {
      error: "Live project URL is required."
    });
  }

  if (!isValidUrl(live)) {
    return fail(400, {
      error: "Please enter a valid live project URL."
    });
  }

  let image = "";

  try {
    image = await uploadImage(imageFile, "ml-club/projects");
  } catch (error) {
    return fail(400, {
      error: error.message || "Image upload failed."
    });
  }

  await Project.create({
    title,
    category,
    description,
    image,
    techStack: convertTechStack(techStack),
    github,
    live
  });

  throw redirect(303, "/dashboard/projects");
},
updateProject: async ({ request }) => {
  await connectDB();

  const formData = await request.formData();

  const id = formData.get("id");
  const title = formData.get("title");
  const category = formData.get("category");
  const description = formData.get("description");
  const oldImage = formData.get("oldImage") || "";
  const imageFile = formData.get("imageFile");
  const techStack = formData.get("techStack") || "";
  const github = formData.get("github") || "";
  const live = formData.get("live") || "";

  if (!id) {
    return fail(400, {
      error: "Project ID is required."
    });
  }

  if (!title || !category || !description) {
    return fail(400, {
      error: "Title, category, and description are required."
    });
  }

  if (!oldImage && (!imageFile || imageFile.size === 0)) {
    return fail(400, {
      error: "Please upload a project image."
    });
  }

  if (!github) {
    return fail(400, {
      error: "GitHub URL is required."
    });
  }

  if (!isValidUrl(github)) {
    return fail(400, {
      error: "Please enter a valid GitHub URL."
    });
  }

  if (!live) {
    return fail(400, {
      error: "Live project URL is required."
    });
  }

  if (!isValidUrl(live)) {
    return fail(400, {
      error: "Please enter a valid live project URL."
    });
  }

  let image = oldImage;

  try {
    if (imageFile && imageFile.size > 0) {
      image = await uploadImage(imageFile, "ml-club/projects");
    }
  } catch (error) {
    return fail(400, {
      error: error.message || "Image upload failed."
    });
  }

  await Project.findByIdAndUpdate(id, {
    title,
    category,
    description,
    image,
    techStack: convertTechStack(techStack),
    github,
    live
  });

  throw redirect(303, "/dashboard/projects");
},

  deleteProject: async ({ request }) => {
    await connectDB();

    const formData = await request.formData();

    const id = formData.get("id");

    if (!id) {
      return fail(400, {
        error: "Project ID is required"
      });
    }

    await Project.findByIdAndDelete(id);

    throw redirect(303, "/dashboard/projects");
  }
};