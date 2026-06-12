import { fail, redirect } from "@sveltejs/kit";
import { connectDB } from "$lib/server/db";
import Member from "$lib/server/models/member";
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

  const members = await Member.find().sort({ createdAt: -1 });

  return {
    members: JSON.parse(JSON.stringify(members))
  };
}

export const actions = {
addMember: async ({ request }) => {
  await connectDB();

  const formData = await request.formData();

  const name = formData.get("name");
  const role = formData.get("role");
  const department = formData.get("department");
  const imageFile = formData.get("imageFile");
  const linkedin = formData.get("linkedin") || "";
  const github = formData.get("github") || "";

  // 1. Required text fields
  if (!name || !role || !department) {
    return fail(400, {
      error: "Name, role, and department are required."
    });
  }

  // 2. Image is required while adding member
  if (!imageFile || imageFile.size === 0) {
    return fail(400, {
      error: "Please upload a member image."
    });
  }

  // 3. LinkedIn is required
  if (!linkedin) {
    return fail(400, {
      error: "LinkedIn URL is required."
    });
  }

  // 4. LinkedIn must be valid URL
  if (!isValidUrl(linkedin)) {
    return fail(400, {
      error: "Please enter a valid LinkedIn URL."
    });
  }

  // 5. GitHub is required
  if (!github) {
    return fail(400, {
      error: "GitHub URL is required."
    });
  }

  // 6. GitHub must be valid URL
  if (!isValidUrl(github)) {
    return fail(400, {
      error: "Please enter a valid GitHub URL."
    });
  }

  let image = "";

  // 7. Upload image safely
  try {
    image = await uploadImage(imageFile, "ml-club/members");
  } catch (error) {
    return fail(400, {
      error: error.message
    });
  }

  // 8. Save to MongoDB
  await Member.create({
    name,
    role,
    department,
    image,
    linkedin,
    github
  });

  throw redirect(303, "/dashboard/members");
},updateMember: async ({ request }) => {
  await connectDB();

  const formData = await request.formData();

  const id = formData.get("id");
  const name = formData.get("name");
  const role = formData.get("role");
  const department = formData.get("department");
  const oldImage = formData.get("oldImage") || "";
  const imageFile = formData.get("imageFile");
  const linkedin = formData.get("linkedin") || "";
  const github = formData.get("github") || "";

  if (!id) {
    return fail(400, {
      error: "Member ID is required."
    });
  }

  if (!name || !role || !department) {
    return fail(400, {
      error: "Name, role, and department are required."
    });
  }

  if (!oldImage && (!imageFile || imageFile.size === 0)) {
    return fail(400, {
      error: "Please upload a member image."
    });
  }

  if (!linkedin) {
    return fail(400, {
      error: "LinkedIn URL is required."
    });
  }

  if (!isValidUrl(linkedin)) {
    return fail(400, {
      error: "Please enter a valid LinkedIn URL."
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

  let image = oldImage;

  try {
    if (imageFile && imageFile.size > 0) {
      image = await uploadImage(imageFile, "ml-club/members");
    }
  } catch (error) {
    return fail(400, {
      error: error.message || "Image upload failed."
    });
  }

  await Member.findByIdAndUpdate(id, {
    name,
    role,
    department,
    image,
    linkedin,
    github
  });

  throw redirect(303, "/dashboard/members");
},
  deleteMember: async ({ request }) => {
    await connectDB();

    const formData = await request.formData();

    const id = formData.get("id");

    if (!id) {
      return fail(400, {
        error: "Member ID is required"
      });
    }

    await Member.findByIdAndDelete(id);

    throw redirect(303, "/dashboard/members");
  }
};