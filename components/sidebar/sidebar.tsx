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

import { signIn, signOut, useSession } from "next-auth/react";

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
    link: "/create",
    requiresAuth: true,
  },
  {
    name: "Profile",
    link: "",
    requiresAuth: true,
  },
];

const Sidebar = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    const response = await signIn("credentials", {
      redirect: false,
      username: "user1",
      password: "123",
    });
    // console.log(response);
  };

  // console.log(session);
  return (
    <aside className="flex-[175px] max-w-[175px] flex-grow-0 border-r border-solid border-r-1 border-[#DBDBDB]">
      <h1 className="p-4">Instagram</h1>
      {items
        .filter((item) => session || (!item.requiresAuth && !session))
        .map((item) => {
          if (session && item.name === "Profile") {
            item.link = session?.user.username;
          }
          return <SidebarItem key={item.name} {...item} />;
        })}
      <hr />
      <p>{JSON.stringify(session)}</p>
      {session ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
    </aside>
  );
};

export default Sidebar;
