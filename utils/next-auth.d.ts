import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      profileImage: string;
    };
  }

  interface User {
    id: string;
    username: string;
    profileImage: string;
  }
}
