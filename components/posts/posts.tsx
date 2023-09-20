import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPosts } from "@/utils/api";
import { getServerSession } from "next-auth";
import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";
import {
  GoBookmark,
  GoComment,
  GoHeart,
  GoPaperAirplane,
} from "react-icons/go";
import PostComments from "./post-comments";

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

  if (!posts) {
    return null;
  }

  if (posts && !Array.isArray(posts) && "message" in posts) {
    return <p>{posts.message}</p>;
  }

  console.log("thepost", posts);

  return (
    <div className="flex flex-col gap-10">
      {posts.map((post: any) => (
        <>
          <div key={post._id}>
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
                  <span className="px-1">•</span>
                  <span>
                    {formatDistance(new Date(post.createdAt), new Date())}
                  </span>
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
              <div className="flex justify-between items-center text-2xl py-2">
                <div className="flex gap-4">
                  <div className="hover:opacity-50 active:opacity-30 cursor-pointer">
                    <GoHeart />
                  </div>
                  <div className="hover:opacity-50 active:opacity-30 cursor-pointer">
                    <GoComment />
                  </div>
                  <div className="hover:opacity-50 active:opacity-30 cursor-pointer">
                    <GoPaperAirplane />
                  </div>
                </div>
                <div className="hover:opacity-50 active:opacity-30 cursor-pointer">
                  <GoBookmark />
                </div>
              </div>
              <div>{post.likes.length} likes</div>
              <strong>author</strong> {post.caption}
              <PostComments
                postId={post._id}
                comments={post.comments}
                userId={session.user.id}
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Posts;
