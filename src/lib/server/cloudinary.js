import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} from "$env/static/private";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export async function uploadImage(file, folder = "ml-club") {
  // No image selected
  if (!file || typeof file === "string" || file.size === 0) {
    return "";
  }

  const maxSize = 2 * 1024 * 1024; // 2MB

  if (file.size > maxSize) {
    throw new Error("Image size must be less than 2MB.");
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WEBP images are allowed.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image"
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}