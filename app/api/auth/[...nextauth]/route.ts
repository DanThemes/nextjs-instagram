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
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        await dbConnect();
        const user = await User.findOne({ username: credentials.username });

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
  callbacks: {
    async jwt(data) {
      data.token.username = "111";
      console.log("jwtttt");
      return data.token;
    },
    async session(data) {
      console.log({ data });
      return {
        ...data.session,
        user: { ...data.session.user, username: data.token.username },
      };
    },
  },
});

export { handler as GET, handler as POST };
