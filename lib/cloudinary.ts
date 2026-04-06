import { v2 as cloudinary } from "cloudinary";

const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;

if (!api_key || !api_secret || !cloud_name) {
  throw new Error(
    "Thiếu biến môi trường Cloudinary. Vui lòng kiểm tra CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET và CLOUDINARY_CLOUD_NAME.",
  );
}

cloudinary.config({
  api_key,
  api_secret,
  cloud_name,
});

export default cloudinary;
