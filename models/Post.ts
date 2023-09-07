import mongoose from "mongoose";
import { MediaSchema } from "./Media";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: [
      {
        type: MediaSchema,
        validate: [
          arrayMinLength,
          "At least one media item (image or video) is required.",
        ],
      },
    ],
    caption: String,
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

function arrayMinLength(arr: string[]) {
  return arr && arr.length > 0;
}

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
