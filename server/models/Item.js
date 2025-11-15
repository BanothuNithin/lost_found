import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["lost", "found"], required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    photoUrl: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);
