"use client";

import { CommentType } from "@/models/Comment";
import { UserType } from "@/models/User";
import { addComment, toggleLike } from "@/utils/api";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEmojiSmile } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";

type PostCommentsType = {
  postId: string;
  comments: (Omit<CommentType, "userId"> & { _id: string; userId: UserType })[];
  userId?: string;
};

export default function PostComments({
  postId,
  comments,
  userId,
}: PostCommentsType) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const router = useRouter();

  const submitComment = async (data: FieldValues) => {
    if (isSubmitting || !userId) return;
    await addComment(postId, data.text, userId);
    reset();
    router.refresh();
  };

  const handleToggleLike = async (id: string) => {
    if (!userId) return;

    await toggleLike({
      userId,
      postId: id,
    });
    router.refresh();
  };

  console.log("comments view", comments);

  return (
    <>
      {comments && (
        <div className="flex flex-col gap-3 mt-3">
          {comments.map((comment) => (
            <div key={comment._id}>
              <div className="flex gap-3 items-center">
                <div className="flex flex-col gap-2">
                  <Link href={`/${comment.userId.username}`}>
                    <Image
                      src={comment.userId.profileImage!}
                      alt={comment.userId.username!}
                      width={30}
                      height={30}
                      className="rounded-full bg-cover border"
                    />
                  </Link>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <div>
                    <Link
                      href={`/${comment.userId.username}`}
                      className="font-bold hover:opacity-50 mr-3"
                    >
                      {comment.userId.username}
                    </Link>

                    {comment.text}
                  </div>

                  <div className="flex gap-3 items-center text-sm">
                    <span>
                      {formatDistance(new Date(comment.createdAt), new Date())}
                    </span>
                    <span>{comment.likes.length} likes</span>
                    <span>Reply</span>
                  </div>
                </div>
                <div
                  className="flex justify-end hover:opacity-50 active:opacity-30 cursor-pointer"
                  onClick={() => handleToggleLike(comment._id)}
                >
                  {comment.likes.includes(userId as any) ? (
                    <GoHeartFill />
                  ) : (
                    <GoHeart />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {userId && (
        <div className="flex justify-between border-b py-4">
          <form onSubmit={handleSubmit(submitComment)} className="flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full focus:outline-none"
              {...register("text", {
                required: true,
                minLength: 1,
              })}
            />
          </form>
          <div className="basis-[2rem] cursor-pointer hover:opacity-50 flex justify-end">
            <BsEmojiSmile />
          </div>
        </div>
      )}
    </>
  );
}
