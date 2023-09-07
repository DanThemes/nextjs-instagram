import User from "@/models/User";
import dbConnect from "@/utils/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
        email: { type: "email" },
      },
      // @ts-ignore
      async authorize(credentials) {
        if (
          !credentials ||
          !credentials.username ||
          !credentials.password ||
          !credentials.email
        ) {
          console.log(credentials);
          return null;
        }

        await dbConnect();
        const user = await User.findOne({ username: credentials!.username });

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatches) {
          return null;
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTJS_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
});

export { handler as GET, handler as POST };
