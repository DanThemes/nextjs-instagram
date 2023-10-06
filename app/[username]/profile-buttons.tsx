"use client";

import FollowButton from "@/components/follow-button";
import { UserType } from "@/models/User";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { GoGear } from "react-icons/go";

type ProfileButtonsType = {
  user: UserType & { _id: string };
};

const ProfileButtons = ({ user }: ProfileButtonsType) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session && session.user.id === user._id) {
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
  // console.log({ isFollowed, followers, loggedInUserId });

  return (
    <>
      <FollowButton user={user} />
      <button className="gray_button">Message</button>
      <button>...</button>
    </>
  );
};

export default ProfileButtons;
