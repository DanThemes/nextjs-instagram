import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

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

export type MediaType = HydratedDocument<InferSchemaType<typeof MediaSchema>>;

const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema);

export default Media;
