import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "complaint_items",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// multer upload middleware
export const upload = multer({ storage });

// function to get URL
export const uploadImage = async (req) => {
  return req.file.path; // cloudinaryStorage gives URL in path
};
