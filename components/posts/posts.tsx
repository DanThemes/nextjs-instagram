import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Post } from "@/models/Post";
import { getPosts } from "@/utils/api";
import { getServerSession } from "next-auth";
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

  const posts = await getPosts(session.user.id, false); // change it to true after I add more posts

  console.log({ id: session.user.id, posts });

  if (!posts) {
    return null;
  }

  return (
    <div>
      {posts.map((post: any) => (
        <>
          <div key={post.id}>{JSON.stringify(post)}</div>
          <div key={post.id}>
            <div>
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
