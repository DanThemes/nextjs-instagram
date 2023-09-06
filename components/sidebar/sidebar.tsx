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
  },
  {
    icon: GoSearch,
    name: "Search",
    link: "/search",
  },
  {
    icon: GoTelescope,
    name: "Expore",
    link: "/explore",
  },
  {
    icon: GoVideo,
    name: "Reels",
    link: "/reels",
  },
  {
    icon: GoPaperAirplane,
    name: "Messages",
    link: "/messages",
  },
  {
    icon: GoHeart,
    name: "Notifications",
    link: "/notifications",
  },
  {
    icon: GoPlusCircle,
    name: "Create",
    link: "/create",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const Sidebar = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <aside className="flex-[200px] flex-grow-0 border-r border-solid border-r-1 border-[#DBDBDB]">
      <h1 className="p-4">Instagram</h1>
      {items.map((item) => (
        <SidebarItem key={item.name} {...item} />
      ))}
      <hr />
      {JSON.stringify(session)}
      {session ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn("credentials", {})}>Sign in</button>
      )}
    </aside>
  );
};

export default Sidebar;
