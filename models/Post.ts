import mongoose, { InferSchemaType } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
        // validate: {
        //   validator: arrayMinLength,
        //   message: "At least one media item (image or video) is required.",
        // },
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
  return true; //arr && arr.length > 0;
}

export type PostType = InferSchemaType<typeof PostSchema>;

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
