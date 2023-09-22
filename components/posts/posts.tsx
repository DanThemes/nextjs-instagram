import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPosts } from "@/utils/api";
import { getServerSession } from "next-auth";
import React from "react";
import Post from "./post";
import { PostType } from "@/models/Post";

const Posts = async ({ posts }: { posts?: PostType }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  const;

  if (!posts) {
    const response = await getPosts({
      userId: session.user.id,
      onlyFollowingUsersPosts: false,
    });
    if (!response) {
      posts = response;
    }
  }

  if (posts && !Array.isArray(posts) && "message" in posts) {
    return <p>{posts.message}</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      {posts.map((post: any) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
