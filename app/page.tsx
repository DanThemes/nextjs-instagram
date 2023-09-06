import Posts from "@/components/posts/posts";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 px-10 py-4">
        <Posts />
      </main>
    </div>
  );
}
