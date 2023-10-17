import { Types } from "mongoose";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: Types.ObjectId;
      username: string;
      profileImage: string;
    };
  }

  interface User {
    id: Types.ObjectId;
    username: string;
    profileImage: string;
  }
}
