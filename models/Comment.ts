import mongoose, { HydratedDocument, InferSchemaType, Types } from "mongoose";
import { UserType } from "./User";

export const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
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

export type CommentType = HydratedDocument<
  InferSchemaType<typeof CommentSchema>
> & {
  _id: Types.ObjectId;
};

export type PopulatedCommentType = Omit<
CommentType,
  "userId" | "likes"
> & {
  userId: UserType;
  likes: UserType[];
};

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
