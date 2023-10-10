import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    commentsDisabled: Boolean,
    hideLikes: Boolean,
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

export type PostType = HydratedDocument<InferSchemaType<typeof PostSchema>>;

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
