import User from "@/models/User";
import dbConnect from "@/utils/db";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/clientPromise";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.username = user.username;
      }
      // console.log("callback jwt", { token, user, session });
      return token;
    },
    async session({ session, token, user }) {
      // console.log("callback session", { session, token, user });
      session.user.username = token.username as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
