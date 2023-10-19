"use client";

import { UserType } from "@/models/User";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type SidebarSearchResultsProps = {
  results: UserType[] | null;
};

export default function SidebarSearchResults({
  results,
}: SidebarSearchResultsProps) {
  if (!results || !results.length) {
    return <p>No results</p>;
  }
  return (
    <div>
      <p className="font-bold">Recent</p>
      <ul className="flex flex-col gap-3 mt-3 justify-center">
        {results.map((user) => (
          <li key={user._id.toString()} className="flex items-center gap-2">
            <span className="flex gap-3 items-center">
              <Link
                href={`/${user.username}`}
                className="w-[3rem] h-[3rem] rounded-full bg-cover border relative"
              >
                <Image
                  src={user.profileImage || "/avatar.jpg"}
                  alt={user.username}
                  width={40}
                  height={40}
                  className="rounded-full h-full w-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </Link>
            </span>
            <span className="flex flex-col">
              <span className="leading-[1rem]">{user.username}</span>
              <span className="leading-[1rem] text-slate-400">
                {user.displayName}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
