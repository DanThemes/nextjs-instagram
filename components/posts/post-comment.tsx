"use client";

import React, { forwardRef, useState } from "react";
import { PopulatedCommentType } from "@/models/Comment";
import PostCommentBody from "./post-comment-body";

type PostCommentType = {
  comment: PopulatedCommentType;
  userId?: string;
  replies?: PopulatedCommentType[];
  setValue: (field: any, value: any) => void;
};

export default forwardRef<HTMLInputElement, PostCommentType>(
  function PostComment({ comment, userId, replies, setValue }, ref) {
    const [showReplies, setShowReplies] = useState(false);

    const handleToggleReplies = () => {
      setShowReplies((prev) => !prev);
    };

    return (
      <>
        <PostCommentBody
          comment={comment}
          userId={userId}
          setValue={setValue}
        />
        {replies && replies?.length > 0 && (
          <div className="mt-3 pl-12">
            <div
              className="text-sm select-none cursor-pointer active:opacity-50"
              onClick={handleToggleReplies}
            >
              ----- {showReplies ? "Hide replies" : "Show replies"} (
              {replies.length})
            </div>
            {showReplies && (
              <div className="mt-3 pl-5 flex flex-col gap-3">
                {replies?.map((reply) => (
                  <PostCommentBody
                    key={reply._id.toString()}
                    comment={reply}
                    userId={userId}
                    setValue={setValue}
                    ref={ref}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </>
    );
  }
);
