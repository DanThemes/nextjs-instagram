import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPosts } from "@/utils/api";
import { getServerSession } from "next-auth";
import React from "react";
import Post from "./post";
import { PostType } from "@/models/Post";
import PostModal from "../modals/post-modal";

const Posts = async ({
  posts,
}: {
  posts?: PostType[] | { message: string };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  if (!posts) {
    posts = await getPosts({
      userId: session.user.id,
      onlyFollowingUsersPosts: false,
    });

    if (!posts) {
      return null;
    }
  }

  // console.log("aa", posts);

  if (posts && !Array.isArray(posts) && "message" in posts) {
    return <p>{posts.message}</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      {posts.length ? (
        posts.map((post: any) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Posts;
