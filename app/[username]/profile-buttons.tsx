"use client";

import { followUser } from "@/utils/api";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GoGear } from "react-icons/go";

const ProfileButtons = ({ userId }: { userId: string }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
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

  const isFollowed = () => {
    return;
  };

  const handleFollow = async () => {
    if (!session) return;

    await followUser({
      followerId: session.user.id,
      followingId: userId,
    });

    router.refresh();
  };

  return (
    <>
      <button className="blue_button" onClick={handleFollow}>
        Follow
      </button>
      <button className="gray_button">Message</button>
      <button>...</button>
    </>
  );
};

export default ProfileButtons;
