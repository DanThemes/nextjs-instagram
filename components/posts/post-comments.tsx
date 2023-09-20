"use client";

import { User, UserType } from "@/models/User";
import { addComment } from "@/utils/api";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEmojiSmile } from "react-icons/bs";
import { GoHeart } from "react-icons/go";

type PostCommentsType = {
  postId: string;
  comments: { _id: string; text: string; userId: Partial<UserType> }[];
  userId: string;
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
    if (isSubmitting) return;
    await addComment(postId, data.text, userId);
    reset();
    router.refresh();
  };

  /*

createdAt
parentCommentId
postId
text
updatedAt
userId
  profileImage
  username

*/

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
                <div className="flex justify-end hover:opacity-50 active:opacity-30 cursor-pointer">
                  <GoHeart />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
    </>
  );
}
