import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // @ts-ignore
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const user = { id: "1", name: "Testulescu" };
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
