export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/(search|explore|reels|messages|notifications)"],
};
