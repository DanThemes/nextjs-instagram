"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";
import cn from "@/utils/utils";
import useNewPostModal from "@/hooks/useNewPostModal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getUser } from "@/utils/api";
import { UserType } from "@/models/User";
import UserAvatar from "../user-avatar";

type SidebarItemProps = {
  icon?: IconType;
  name: string;
  link: string;
  modal?: () => JSX.Element | null;
  user?: any;
};

const SidebarItem = ({
  icon: Icon,
  name,
  link,
  modal: Modal,
  user,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const newPostModal = useNewPostModal();

  return (
    <div className={cn("group px-2 py-1", { "mb-8": name === "Instagram" })}>
      <Link href={link}>
        <div
          className={cn(
            "group p-2 group-hover:bg-neutral-100 transition flex items-center rounded-md group-active:opacity-50"
          )}
          onClick={() => Modal && newPostModal.toggle()}
        >
          <span className="mr-0 lg:mr-3">
            {name === "Profile" && user && user.profileImage ? (
              <div className="w-[1.5rem] h-[1.5rem] rounded-full bg-cover relative group-hover:scale-105 group-active:scale-95 transition">
                <UserAvatar
                  src={user.profileImage}
                  width={40}
                  height={40}
                  className={
                    "w-full h-full object-cover rounded-full border border-black"
                  }
                />
              </div>
            ) : (
              Icon && (
                <Icon
                  size="1.5rem"
                  className={cn(
                    "group-hover:scale-105 group-active:scale-95 transition"
                  )}
                />
              )
            )}
          </span>
          <span
            className={cn("hidden lg:block", {
              "font-bold": pathname === link && name !== "Search",
            })}
          >
            {name}
          </span>
        </div>
      </Link>
      {Modal && <Modal />}
    </div>
  );
};

export default SidebarItem;
