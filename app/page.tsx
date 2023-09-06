import Posts from "@/components/posts/posts";
import Sidebar from "@/components/sidebar/sidebar";
import { signIn } from "next-auth/react";

export default function Home() {
  const auth = useSession
  return (
    <div className="flex h-full">
      <button onClick={() => signIn("credentials", {})}>Sign in</button>
      <Sidebar />
      <main className="flex-1 px-10 py-4">
        <Posts />
      </main>
    </div>
  );
}
