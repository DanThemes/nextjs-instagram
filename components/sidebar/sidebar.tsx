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
import { useRouter } from "next/navigation";
import { BiLogoInstagram } from "react-icons/bi";
import cn from "@/utils/utils";

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
    link: "", // TODO: make this an intercepting route
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
  const router = useRouter();

  const handleSignIn = async () => {
    const response = await signIn("credentials", {
      redirect: false,
      username: "dani",
      password: "123",
    });
    // console.log(response);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  if (status !== "authenticated") {
    return null;
  }

  return (
    <>
      <div className="group px-2 py-1 mb-8">
        <Link href="/">
          <div className="group p-2 group-hover:bg-neutral-100 transition flex items-center rounded-md group-active:opacity-50 lg:group-hover:bg-transparent">
            <span className="mr-0 lg:mr-3 block lg:hidden">
              <BiLogoInstagram
                size="1.5rem"
                className="group-hover:scale-105 group-active:scale-95 transition"
              />
            </span>

            <span className="hidden lg:block lg:text-[1.2rem] leading-[1.5rem]">
              Instagram
            </span>
          </div>
        </Link>
      </div>
      {items
        .filter((item) => session || (!item.requiresAuth && !session))
        .map((item) => {
          if (session && item.name === "Profile") {
            item.link = "/" + session?.user.username;
          }
          return (
            <div key={item.name}>
              <SidebarItem {...item} user={session?.user} />
            </div>
          );
        })}
      <hr />
      <p>{JSON.stringify(session)}</p>
      {session ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
    </>
  );
};

export default Sidebar;
