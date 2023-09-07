"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div>
      <div className="flex">
        <Image src="/avatar.jpg" width={100} height={100} alt={"avatar"} />
      </div>
    </div>
  );
};

export default Profile;
