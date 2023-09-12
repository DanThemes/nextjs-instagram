import { Timestamp } from "mongodb";
import mongoose, { InferSchemaType } from "mongoose";

const SessionSchema = new mongoose.Schema({
  expires: Timestamp,
  sessionToken: String,
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

export type Session = InferSchemaType<typeof SessionSchema>;

const Session =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;
