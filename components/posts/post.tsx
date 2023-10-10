"use client";

import { toggleLike } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import PostMedia from "./post-media";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import {
  GoBookmark,
  GoComment,
  GoHeart,
  GoHeartFill,
  GoKebabHorizontal,
  GoPaperAirplane,
} from "react-icons/go";
import PostComments from "./post-comments";
import { UserType } from "@/models/User";
import Link from "next/link";
import usePostModal from "@/hooks/usePostModal";
import useUsersModal from "@/hooks/useUsersModal";
import cn from "@/utils/utils";

export default function Post({ post }: { post: any }) {
  const router = useRouter();
  const postModal = usePostModal();
  const usersModal = useUsersModal();

  const { data: session } = useSession();

  const handleToggleLike = async (id: string) => {
    if (!session) return;

    await toggleLike({
      userId: session.user.id,
      postId: id,
    });

    router.refresh();
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCommentIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div className="flex gap-3 items-center pb-3">
        <Link
          href={`/${post.userId.username}`}
          className="w-[3rem] h-[3rem] rounded-full bg-cover border relative"
        >
          <Image
            src={post.userId.profileImage}
            alt={post.userId.username}
            width={40}
            height={40}
            className="rounded-full h-full w-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </Link>
        <div>
          <span className="font-bold">
            <Link
              href={`/${post.userId.username}`}
              className="hover:opacity-50"
            >
              {post.userId.username}
            </Link>
          </span>
          <span className="px-1">•</span>
          <span>{formatDistance(new Date(post.createdAt), new Date())}</span>
        </div>
        <div
          className="ml-auto cursor-pointer hover:opacity-50 p-4 pr-0"
          onClick={() => {
            postModal.setPostId(post._id);
            postModal.setHideLikes(!!post.hideLikes);
            postModal.setCommentsDisabled(!!post.commentsDisabled);
            postModal.toggle();
          }}
        >
          <GoKebabHorizontal />
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
          <div
            className="hover:opacity-50 active:opacity-30 cursor-pointer"
            onClick={() => handleCommentIconClick()}
          >
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
      {!post.hideLikes && (
        <div className="flex">
          <span
            className={cn({ "cursor-pointer": post.likes.length })}
            onClick={() => {
              if (!post.likes.length) return;

              usersModal.setUsers(post.likes);
              usersModal.setTitle("Likes");
              usersModal.toggle();
            }}
          >
            {post.likes.length === 1 ? `1 like` : `${post.likes.length} likes`}
          </span>
        </div>
      )}
      <strong>author</strong> {post.caption}
      <PostComments
        postId={post._id}
        commentsDisabled={post.commentsDisabled}
        comments={post.comments}
        userId={session?.user.id}
        ref={inputRef}
      />
    </>
  );
}
