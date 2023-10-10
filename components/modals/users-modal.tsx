"use client";

import React from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUsersModal from "@/hooks/useUsersModal";
import { UserType } from "@/models/User";
import Link from "next/link";
import UserAvatar from "../user-avatar";

export default function UsersModal() {
  const usersModal = useUsersModal();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return null;
  }

  if (!usersModal.users) {
    return null;
  }

  const handleClick = (link: string) => {
    usersModal.toggle();
    router.push(link);
  };

  return (
    <Modal
      isOpen={usersModal.isOpen}
      toggle={usersModal.toggle}
      title={usersModal.title}
    >
      <ul className="flex flex-col gap-3 max-h-[35dvh] overflow-y-scroll no-scrollbar">
        {(usersModal.users as (UserType & { _id: string })[]).map((user) => (
          <li
            key={user._id}
            className="py-2 text-black flex justify-between items-center gap-2"
          >
            <div
              className="flex items-center gap-2 text-sm cursor-pointer"
              onClick={() => handleClick(`/${user.username}`)}
            >
              <span className="w-[40px] h-[40px]">
                <UserAvatar src={user.profileImage} width={40} height={40} />
              </span>
              <span>
                <Link href={`/${user.username}`}>{user.username}</Link>
                <br />
                <span className="text-slate-400">{user.displayName}</span>
              </span>
            </div>
            {user._id !== session.user.id && (
              <span>
                <button className="blue_button">Follow</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </Modal>
  );
}
