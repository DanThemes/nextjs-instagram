import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // @ts-ignore
    CredentialsProvider({
      async authorize(credentials) {
        const user = { id: "1", name: "Testulescu" };
        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
