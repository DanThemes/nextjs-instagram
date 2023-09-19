import HomeSidebar from "@/components/home-sidebar";
import Posts from "@/components/posts/posts";

export default function Home() {
  return (
    <div className="flex gap-10">
      <div className="flex-[2] flex-shrink-0">
        <Posts />
      </div>
      <div className="flex-[1] flex-shrink-0">
        <HomeSidebar />
      </div>
    </div>
  );
}
