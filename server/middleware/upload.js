import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TEMP upload folder for multer
const upload = multer({ dest: path.join(__dirname, "../temp") });

// Function to configure Cloudinary (call this after dotenv.config())
export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log(
    "Cloudinary config set with cloud_name:",
    process.env.CLOUDINARY_CLOUD_NAME
  );
};

export const uploadImage = async (req) => {
  if (!req.file) return null;

  console.log("uploadImage called, file:", req.file.filename);
  console.log("Cloudinary config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? "set" : "missing",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "set" : "missing",
  });

  // Upload to Cloudinary
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "lostfound_items",
    });
    console.log("Cloudinary upload successful:", result.secure_url);

    // Delete temp file
    fs.unlinkSync(req.file.path);

    return result.secure_url; // final image URL
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    throw err;
  }
};

export default upload;
