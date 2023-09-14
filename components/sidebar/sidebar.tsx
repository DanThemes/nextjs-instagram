"use client";

import React from "react";
import {
  GoHome,
  GoSearch,
  GoTelescope,
  GoVideo,
  GoPaperAirplane,
  GoHeart,
  GoPlusCircle,
} from "react-icons/go";
import SidebarItem from "./sidebar-item";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import NewPostModal from "../modals/new-post-modal";

const items = [
  {
    icon: GoHome,
    name: "Home",
    link: "/",
    requiresAuth: false,
  },
  {
    icon: GoSearch,
    name: "Search",
    link: "/search",
    requiresAuth: false,
  },
  {
    icon: GoTelescope,
    name: "Expore",
    link: "/explore",
    requiresAuth: false,
  },
  {
    icon: GoVideo,
    name: "Reels",
    link: "/reels",
    requiresAuth: false,
  },
  {
    icon: GoPaperAirplane,
    name: "Messages",
    link: "/messages",
    requiresAuth: true,
  },
  {
    icon: GoHeart,
    name: "Notifications",
    link: "/notifications",
    requiresAuth: true,
  },
  {
    icon: GoPlusCircle,
    name: "Create",
    link: "",
    modal: NewPostModal,
    requiresAuth: true,
  },
  {
    name: "Profile",
    link: "",
    requiresAuth: true,
  },
];

const Sidebar = () => {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    const response = await signIn("credentials", {
      redirect: false,
      username: "dani",
      password: "123",
    });
    // console.log(response);
  };

  if (status === "loading") {
    return null;
  }

  // console.log(session);
  return (
    <>
      <h1 className="p-4">
        <Link href="/">Instagram</Link>
      </h1>
      {items
        .filter((item) => session || (!item.requiresAuth && !session))
        .map((item) => {
          if (session && item.name === "Profile") {
            item.link = "/" + session?.user.username;
          }
          // if (!item.modal) {
          //   delete item.modal;
          // }
          return (
            <div key={item.name}>
              <SidebarItem {...item} />
            </div>
          );
        })}
      <hr />
      <p>{JSON.stringify(session)}</p>
      {session ? (
        <button onClick={() => signOut({ redirect: false })}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
    </>
  );
};

export default Sidebar;
