"use client";

import FollowButton from "@/components/follow-button";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import { UserType } from "@/models/User";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { GoGear } from "react-icons/go";

type ProfileButtonsType = {
  user: UserType;
};

const ProfileButtons = ({ user }: ProfileButtonsType) => {
  const editProfileModal = useEditProfileModal();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session && session.user.id === user._id.toString()) {
    return (
      <>
        <button
          className="gray_button"
          onClick={() => {
            console.log({ editProfileModal });
            editProfileModal.toggle();
          }}
        >
          Edit profile
        </button>
        {/* <button className="gray_button">View Archive</button> */}
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
