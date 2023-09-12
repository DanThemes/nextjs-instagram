"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/models/User";
import PageNotFound from "@/components/page-not-found";

const Profile = ({ params }: { params: { username: string } }) => {
  // TODO: use react-query instead
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const response = await fetch(
          `http://localhost:3000/api/users/${params.username}`
        );
        const data = await response.json();
        console.log(data);
        if ("user" in data) {
          setUser(data.user);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    })();
  }, [params.username]);

  const { data: session } = useSession();

  // if (!session) return null;

  if (error) {
    return <PageNotFound />;
  }

  if (!user) return null;
  // console.log(user);

  const isPageOwner = session && session.user.username === user.username;

  return (
    <div className="flex">
      <div className="flex-1">
        <Image
          src="/avatar.jpg"
          width={150}
          height={150}
          alt={"avatar"}
          className="rounded-full border"
        />
      </div>
      <div className="flex flex-[2] flex-col">
        <div>
          <div className="flex gap-2 items-center">
            <div className="text-lg flex-1">{user.username}</div>
            <div className="flex items-center gap-3">
              <button className="bg-[#0095F6] text-[white] rounded-lg px-5 py-2 text-sm font-bold hover:bg-[#1877F2] active:opacity-50">
                Follow
              </button>
              <button className="bg-[#efefef] text-[#000] rounded-lg px-5 py-2 text-sm font-bold hover:bg-[#dbdbdb] active:opacity-50">
                Message
              </button>
              <button>...</button>
            </div>
          </div>
        </div>
        <div className="flex gap-10 pt-7">
          <div>
            <strong>{user.posts.length}</strong> posts
          </div>
          <div>
            <strong>{user.followers.length}</strong> followers
          </div>
          <div>
            <strong>{user.following.length}</strong> following
          </div>
        </div>
        <div className="flex flex-col pt-7">
          <p className="font-bold">{user.displayName || user.username}</p>
          <p>{user.bio}</p>
          <p className="font-bold">{isPageOwner ? "page owner" : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
