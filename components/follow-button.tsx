"use client";

import { UserType } from "@/models/User";
import { followUser } from "@/utils/api";
import { Types } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoSync } from "react-icons/go";

type FollowButtonType = {
  user: Omit<UserType, "followers"> & {
    followers: UserType[];
  };
};

export default function FollowButton({ user }: FollowButtonType) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(() => {
    if (!session) return false;

    const followers = user.followers.map((follower) => follower._id);

    return followers.includes(session?.user.id);
  });

  if (!session) {
    return null;
  }

  const handleFollow = async () => {
    if (!session || isLoading) return;
    setIsLoading(true);

    await followUser({
      followerId: session.user.id,
      followedId: user._id,
    });

    setIsFollowing((prev) => !prev);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <button className="blue_button" disabled={isLoading} onClick={handleFollow}>
      {isFollowing ? "Unfollow " : "Follow "}
      {isLoading && (
        <div className="animate-spin w-[1rem]">
          <GoSync />
        </div>
      )}
    </button>
  );
}
