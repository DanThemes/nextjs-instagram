import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    };
  }

  interface User {
    username: string;
  }
}
