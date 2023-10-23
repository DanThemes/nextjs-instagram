"use client";

import { SessionType } from "@/models/Session";
import { addChatMessage, getChatInfo } from "@/utils/api";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Types } from "mongoose";
import { Session } from "next-auth";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { BsEmojiSmile } from "react-icons/bs";

type ChatFormProps = {
  session: Session;
};

export default function ChatForm({ session }: ChatFormProps) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const { register, handleSubmit, setValue, setFocus, getValues, reset } =
    useForm({
      defaultValues: {
        text: "",
      },
    });

  const submitMessage = async (data: FieldValues) => {
    await addChatMessage({
      fromUserId: session.user.id,
      toUserId: new Types.ObjectId("1"),
      text: data.text,
      seen: false,
    });
    reset();
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
    <div className="rounded-[2rem] border border-[#dbdbdb] p-3 flex gap-3 items-center">
      <div className="basis-[1rem] cursor-pointer flex justify-end">
        <span className="hover:opacity-50" onClick={handleOpenEmojiPicker}>
          <BsEmojiSmile />
        </span>
        {isEmojiPickerOpen && (
          <div className="z-[999] relative">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={handleCloseEmojiPicker}
            ></div>
            <div className="absolute bottom-[0.5rem] -left-[0.5rem]">
              <EmojiPicker
                onEmojiClick={handlePickEmoji}
                height={500}
                width={400}
              />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(submitMessage)}>
        <input
          type="text"
          {...register("text")}
          placeholder="Message..."
          className="outline-none w-full"
          autoComplete="off"
        />
      </form>
    </div>
  );
}
