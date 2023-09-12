"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

const Profile = ({ params }: { params: { username: string } }) => {
  const { data: session } = useSession();

  console.log(session);

  if (!session) return null;

  const isPageOwner = session && session.user.username === params.username;

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
          <div className="flex gap-2">
            <div className="text-lg flex-1">{params.username}</div>
            <div className="flex items-center gap-3">
              <button className="bg-[#0095F6] text-[white] rounded-lg px-5 py-2 text-sm font-bold hover:bg-[#1877F2]">
                Follow
              </button>
              <button className="bg-[#efefef] text-[#000] rounded-lg px-5 py-2 text-sm font-bold hover:bg-[#dbdbdb]">
                Message
              </button>
              <button>...</button>
            </div>
          </div>
        </div>
        <div className="flex gap-10 py-7">
          <div>
            <strong>0</strong> posts
          </div>
          <div>
            <strong>0</strong> followers
          </div>
          <div>
            <strong>0</strong> following
          </div>
        </div>
        <div className="flex gap-10 py-7">
          <div className="font-bold">display name</div>
          <div className="font-bold">{isPageOwner ? "page owner" : ""}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
