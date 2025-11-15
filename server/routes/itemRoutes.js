import express from "express";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";
import {
  createItem,
  getItems,
  markResolved,
  getItemById,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/create", verifyToken, upload.single("photo"), createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id/resolve", verifyToken, markResolved);

export default router;
