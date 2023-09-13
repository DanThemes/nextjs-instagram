"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { GoGear } from "react-icons/go";

const ProfileButtons = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return null;
  }

  if (session && session.user.username === pathname.slice(1)) {
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

  return (
    <>
      <button className="blue_button">Follow</button>
      <button className="gray_button">Message</button>
      <button>...</button>
    </>
  );
};

export default ProfileButtons;
