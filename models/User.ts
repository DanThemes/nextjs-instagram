import mongoose, { HydratedDocument, InferSchemaType, Types } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    displayName: String,
    profileImage: String,
    bio: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export type UserType = HydratedDocument<InferSchemaType<typeof UserSchema>> & {
  _id: Types.ObjectId;
};

export type PopulatedUserType = Omit<UserType, "followers" | "following"> & {
  followers: UserType[];
  following: UserType[];
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
