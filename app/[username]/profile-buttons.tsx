"use client";

import { followUser } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoGear, GoSync } from "react-icons/go";

type ProfileButtonsType = {
  userId: string;
  followers: string[];
  loggedInUserId: string;
};

const ProfileButtons = ({
  userId,
  followers,
  loggedInUserId,
}: ProfileButtonsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(() =>
    followers.includes(loggedInUserId)
  );
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (session && session.user.id === userId) {
    return (
      <>
        <button className="gray_button">Edit profile</button>
        <button className="gray_button">View Archive</button>
        <button className="icon_button">
          <GoGear />
        </button>
      </>
    );
  }
  console.log({ isFollowed, followers, loggedInUserId });

  const handleFollow = async () => {
    if (!session || isLoading) return;
    setIsLoading(true);

    await followUser({
      followerId: session.user.id,
      followedId: userId,
    });

    setIsFollowed((prev) => !prev);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <>
      <button
        className="blue_button"
        disabled={isLoading}
        onClick={handleFollow}
      >
        {isFollowed ? "Unfollow " : "Follow "}
        {isLoading && (
          <div className="animate-spin w-[1rem]">
            <GoSync />
          </div>
        )}
      </button>
      <button className="gray_button">Message</button>
      <button>...</button>
    </>
  );
};

export default ProfileButtons;
