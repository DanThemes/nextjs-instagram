import mongoose, {
  HydratedDocument,
  InferSchemaType,
  PopulatedDoc,
  Types,
  Document,
} from "mongoose";
import { UserType } from "./User";
import { MediaType } from "./Media";
import { CommentType } from "./Comment";

type LikesType = mongoose.Schema.Types.ObjectId[] | PopulatedDoc<UserType>[];

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

export type PostType = Omit<
  HydratedDocument<InferSchemaType<typeof PostSchema>>,
  "userId" | "media" | "comments" | "likes"
> & {
  _id: Types.ObjectId;
  userId: Types.ObjectId | UserType;
  media: (Types.ObjectId | MediaType)[];
  comments: (Types.ObjectId | CommentType)[];
  likes: (Types.ObjectId | UserType)[];
};

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
