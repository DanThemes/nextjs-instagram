import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPosts } from "@/utils/api";
import { getServerSession } from "next-auth";
import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";

const posts = [
  {
    id: 0,
    images: ["/placeholder.jpeg"],
    content: "test content",
  },
];

const Posts = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  const posts = await getPosts({
    userId: session.user.id,
    onlyFollowingUsersPosts: false,
  }); // change it to true after I add more posts

  console.log({ id: session.user.id, posts });

  if (!posts) {
    return null;
  }

  if (posts && !Array.isArray(posts) && "message" in posts) {
    return <p>{posts.message}</p>;
  }

  console.log(posts);

  return (
    <div className="flex flex-col gap-10">
      {posts.map((post: any) => (
        <>
          <div key={post.id}>
            <div>
              <div className="flex gap-3 items-center pb-3">
                <Image
                  src={post.userId.profileImage}
                  alt={post.userId.username}
                  width={40}
                  height={40}
                  className="rounded-full bg-cover border"
                />
                <div>
                  <span className="font-bold">{post.userId.username}</span>
                  <span>•</span>
                  <span>{formatDistance(post.createdAt, new Date())}</span>
                </div>
              </div>
              <div className="relative w-full h-[40dvh] border border-[#dbdbdb]">
                <Image
                  src={post.media[0].url}
                  alt={post.caption}
                  fill
                  className="w-full h-auto object-cover"
                />
              </div>
              <strong>author</strong> {post.caption}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Posts;
