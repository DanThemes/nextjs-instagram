"use client";

import React, { useEffect, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { BiLogoInstagram } from "react-icons/bi";
import cn from "@/utils/utils";
import SidebarSearch from "./sidebar-search";
import { useSocket } from "@/providers/socket-provider";
import { IconType } from "react-icons/lib/esm/iconBase";

export type SidebarItemsType = {
  icon?: IconType;
  name: string;
  link: string;
  requiresAuth: boolean;
  modal?: () => React.JSX.Element | null;
  user?: any;
  notification?: boolean;
};

const items: SidebarItemsType[] = [
  {
    icon: GoHome,
    name: "Home",
    link: "/",
    requiresAuth: false,
  },
  {
    icon: GoSearch,
    name: "Search",
    link: "",
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
  const [searchOpen, setSearchOpen] = useState(false);
  const { socket, notifications, setNotifications } = useSocket();
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!socket || !session) {
      console.log({ socket, session });
      return;
    }

    const receiveMessage = (message: any) => {
      console.log("ping");
      if (!notifications.length) {
        setNotifications((prev) => {
          console.log({ notifications: prev });
          return !prev.includes(message.fromUserId._id.toString())
            ? [...prev, message.fromUserId._id.toString()]
            : prev;
        });
      }
    };

    console.log("socket ON");
    socket.on(`${session.user.id}:messages`, receiveMessage);

    return () => {
      if (socket) {
        console.log("socket OFF");
        socket.off(`${session.user.id}:messages`, receiveMessage);
      }
    };
  }, [socket, session, notifications, setNotifications]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <>
      <div className="overflow-y-scroll no-scrollbar h-full z-10 relative bg-white border-r border-solid border-[#DBDBDB]">
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
            if (session && item.name === "Notifications") {
              item.notification = !!notifications.length;
            }
            if (item.name === "Search") {
              return (
                <div
                  key={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchOpen((prev) => !prev);
                    console.log({ searchOpen });
                  }}
                >
                  <SidebarItem {...item} user={session?.user} />
                </div>
              );
            }
            return (
              <div key={item.name}>
                <SidebarItem {...item} user={session?.user} />
              </div>
            );
          })}
      </div>
      <SidebarSearch searchOpen={searchOpen} />
    </>
  );
};

export default Sidebar;
