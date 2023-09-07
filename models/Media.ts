import mongoose from "mongoose";

export const MediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema);

export default Media;
