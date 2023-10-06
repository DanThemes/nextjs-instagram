"use client";

import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUsersModal from "@/hooks/useUsersModal";
import { getUsers } from "@/utils/api";
import { UserType } from "@/models/User";
import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../user-avatar";

export default function UsersModal() {
  // const [users, setUsers] = useState<UserType[] | []>([]);
  const usersModal = useUsersModal();
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   (async () => {
  //     const users = await getUsers(usersModal.users);
  //     setUsers(users);
  //   })();
  // }, [usersModal]);

  if (!session) {
    return null;
  }

  if (!usersModal.users) {
    return null;
  }

  return (
    <Modal isOpen={usersModal.isOpen} toggle={usersModal.toggle}>
      <ul className="flex flex-col gap-3">
        {(usersModal.users as (UserType & { _id: string })[]).map((user) => (
          <li
            key={user._id}
            className="py-2 text-black flex justify-between gap-2"
          >
            <div className="flex items-center  gap-2 text-sm">
              <span>
                <Link href={`/${user.username}`} className="w-[40px] h-[40px]">
                  <UserAvatar src={user.profileImage} width={40} height={40} />
                </Link>
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
