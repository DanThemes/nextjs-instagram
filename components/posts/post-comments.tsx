"use client";

import { CommentType } from "@/models/Comment";
import { UserType } from "@/models/User";
import { addComment, deleteComment, toggleLike } from "@/utils/api";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { forwardRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEmojiSmile } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

type Props = {
  postId: string;
  comments: (Omit<CommentType, "userId"> & { _id: string; userId: UserType })[];
  userId?: string;
};

const PostComments = forwardRef<HTMLInputElement, Props>(function PostComments(
  { postId, comments, userId },
  ref
) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const { ref: registerRef, ...rest } = register("text");

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
      commentId: id,
    });
    router.refresh();
  };

  const handleOpenEmojiPicker = () => {
    setIsEmojiPickerOpen(true);
  };

  const handleCloseEmojiPicker = () => {
    setIsEmojiPickerOpen(false);
  };

  // Append emoji to text input field
  const handlePickEmoji = (emojiData: EmojiClickData, e: MouseEvent) => {
    const oldText = getValues("text");
    setValue("text", `${oldText}${emojiData.emoji}`);
    handleCloseEmojiPicker();
    setFocus("text");
  };

  const handleDeleteComment = async (id: string) => {
    if (!userId) return;

    await deleteComment(id);
    router.refresh();
  };

  return (
    <>
      {comments && (
        <div className="flex flex-col gap-3 mt-3">
          {comments.map((comment) => (
            <div key={comment._id}>
              <div className="flex gap-3 items-center">
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/${comment.userId.username}`}
                    className="w-[2.25rem] h-[2.25rem] rounded-full bg-cover border relative"
                  >
                    <Image
                      src={comment.userId.profileImage || "/avatar.jpg"}
                      alt={comment.userId.username}
                      width={30}
                      height={30}
                      className="rounded-full h-full w-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
                    {comment.userId._id === userId ? (
                      <span
                        className="text-red-700 cursor-pointer hover:opacity-50"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div
                  className="flex justify-end hover:opacity-50 active:opacity-30 cursor-pointer"
                  onClick={() => handleToggleLike(comment._id)}
                >
                  {userId &&
                  comment.likes.find((like: any) => like._id === userId) ? (
                    <>
                      <GoHeartFill />
                    </>
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
              {...rest}
              ref={(e) => {
                registerRef(e);
                if (ref && typeof ref !== "function") {
                  ref.current = e;
                }
              }}
            />
          </form>
          <div className="basis-[2rem] cursor-pointer flex justify-end">
            <span className="hover:opacity-50" onClick={handleOpenEmojiPicker}>
              <BsEmojiSmile />
            </span>
            {isEmojiPickerOpen && (
              <div className="z-[999] relative">
                <div
                  className="fixed inset-0 bg-black/40"
                  onClick={handleCloseEmojiPicker}
                ></div>
                <div className="absolute top-[2rem] right-0">
                  <EmojiPicker
                    onEmojiClick={handlePickEmoji}
                    height={500}
                    width={400}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});
export default PostComments;
