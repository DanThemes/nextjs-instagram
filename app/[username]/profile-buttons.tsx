"use client";

import FollowButton from "@/components/follow-button";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import { UserType } from "@/models/User";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { GoGear } from "react-icons/go";

type ProfileButtonsType = {
  user: Omit<UserType, "followers"> & {
    followers: UserType[];
  };
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
      <Link href={`/messages/${user._id.toString()}`}>
        <button className="gray_button">Message</button>
      </Link>
      <button>...</button>
    </>
  );
};

export default ProfileButtons;
