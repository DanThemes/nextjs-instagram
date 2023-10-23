import mongoose, { HydratedDocument, InferSchemaType, Types } from "mongoose";
import { UserType } from "./User";

export const MessageSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type MessageType = HydratedDocument<
  InferSchemaType<typeof MessageSchema>
> & {
  _id: Types.ObjectId;
};

export type PopulatedMessageType = Omit<
  MessageType,
  "fromUserId" | "toUserId"
> & {
  fromUserId: UserType;
  toUserId: UserType;
};

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
