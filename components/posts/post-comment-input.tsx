"use client";

import { addComment } from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { forwardRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

type PostCommentInputType = {
  postId: string;
  userId?: string;
};

export default forwardRef<HTMLInputElement, PostCommentInputType>(
  function PostCommentInput({ postId, userId }, ref) {
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
        parentCommentId: "",
      },
    });
    const { ref: registerRef, ...rest } = register("text");

    const router = useRouter();

    const submitComment = async (data: FieldValues) => {
      if (isSubmitting || !userId || !data.text.length) return;
      await addComment(postId, data.text, userId, data.parentCommentId);
      reset();
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

    return (
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
          <input type="hidden" {...register("parentCommentId")} />
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
    );
  }
);
