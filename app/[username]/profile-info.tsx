"use client";

import useUsersModal from "@/hooks/useUsersModal";
import { PostType } from "@/models/Post";
import { UserType } from "@/models/User";
import cn from "@/utils/utils";
import React from "react";

type ProfileInfoType = {
  posts: PostType[];
  following: UserType[];
  followers: UserType[];
};
export default function ProfileInfo({
  posts,
  following,
  followers,
}: ProfileInfoType) {
  const usersModal = useUsersModal();
  console.log({ posts, following, followers });
  return (
    <>
      <div>
        <strong>{posts.length}</strong> posts
      </div>
      <div
        onClick={() => {
          if (!followers.length) return;

          usersModal.setUsers(followers);
          usersModal.setTitle("Followers");
          usersModal.toggle();
        }}
        className={cn({ "cursor-pointer": followers.length })}
      >
        <strong>{followers.length}</strong> followers
      </div>
      <div
        onClick={() => {
          if (!following.length) return;

          usersModal.setUsers(following);
          usersModal.setTitle("Following");
          usersModal.toggle();
        }}
        className={cn({ "cursor-pointer": following.length })}
      >
        <strong>{following.length}</strong> following
      </div>
    </>
  );
}
