import HomeSidebar from "@/components/home-sidebar";
import Posts from "@/components/posts/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NotLoggedIn from "@/components/not-logged-in";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <NotLoggedIn />;
  }

  // return <div className="flex gap-10">test</div>;

  return (
    <div className="flex gap-10">
      <div className="flex-[2] flex-shrink-0">{/* <Posts /> */}</div>
      <div className="flex-[1] flex-shrink-0 hidden md:block">
        <HomeSidebar />
      </div>
    </div>
  );
}
