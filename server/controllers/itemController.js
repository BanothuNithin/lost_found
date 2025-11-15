import Item from "../models/Item.js";
import { uploadImage } from "../middleware/upload.js";

/* ---------------------------------------------
   CREATE ITEM (Lost / Found Posting)
--------------------------------------------- */
export const createItem = async (req, res) => {
  try {
    console.log("CreateItem called");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { title, description, type, location, contact } = req.body;

    let photoUrl = null;

    // Upload image to Cloudinary if provided
    if (req.file) {
      console.log("Uploading image to Cloudinary...");
      photoUrl = await uploadImage(req);
      console.log("Image uploaded, URL:", photoUrl);
    }

    const newItem = new Item({
      title,
      description,
      type,
      location,
      contact,
      photoUrl,
      createdBy: req.userId || null,
    });

    await newItem.save();
    console.log("Item saved successfully:", newItem._id);
    return res.json(newItem);
  } catch (err) {
    console.error("CreateItem Error:", err.message);
    console.error("Stack:", err.stack);
    return res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------
   GET ALL ITEMS
--------------------------------------------- */
export const getItems = async (req, res) => {
  try {
    const { type, q, page = 1, limit = 50 } = req.query;

    const filter = {};

    if (type === "lost" || type === "found") filter.type = type;

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }

    const items = await Item.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Item.countDocuments(filter);

    return res.json({ items, total });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------
   GET SINGLE ITEM BY ID
--------------------------------------------- */
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!item) return res.status(404).json({ msg: "Item not found" });

    return res.json({ item });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* ---------------------------------------------
   MARK ITEM AS RESOLVED
--------------------------------------------- */
export const markResolved = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );

    if (!item) return res.status(404).json({ msg: "Item not found" });

    return res.json(item);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
