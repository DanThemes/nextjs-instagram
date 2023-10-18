// export { default } from "next-auth/middleware";

// TODO: use this code for role-based route protection
import { withAuth } from "next-auth/middleware";
// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      // console.log({ req, token });
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin";
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/(explore|reels|messages|notifications)"],
};
