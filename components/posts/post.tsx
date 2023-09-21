"use client";

import { toggleLike } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import PostMedia from "./post-media";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import {
  GoBookmark,
  GoComment,
  GoHeart,
  GoHeartFill,
  GoPaperAirplane,
} from "react-icons/go";
import PostComments from "./post-comments";
import { UserType } from "@/models/User";

export default function Post({ post }: { post: any }) {
  const router = useRouter();

  const { data: session } = useSession();

  const handleToggleLike = async (id: string) => {
    if (!session) return;

    await toggleLike({
      userId: session.user.id,
      postId: id,
    });

    router.refresh();
  };

  return (
    <>
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
          <span>{formatDistance(new Date(post.createdAt), new Date())}</span>
        </div>
      </div>
      <div className="relative w-full h-[40dvh] border border-[#dbdbdb]">
        <PostMedia post={post} />
      </div>
      <div className="flex justify-between items-center text-2xl py-2">
        <div className="flex gap-4">
          <div
            className="hover:opacity-50 active:opacity-30 cursor-pointer"
            onClick={() => handleToggleLike(post._id)}
          >
            {session &&
            post.likes.find(
              (like: UserType & { _id: string }) =>
                like._id === session?.user.id
            ) ? (
              <>
                <GoHeartFill />
              </>
            ) : (
              <GoHeart />
            )}
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
        userId={session?.user.id}
      />
    </>
  );
}
