"use client";

import cn from "@/utils/utils";
import Image from "next/image";
import React from "react";

type UserAvatarType = {
  src?: string;
  width: number;
  height: number;
  onClick?: () => void;
  className?: string;
};

export default function UserAvatar({
  src,
  width,
  height,
  onClick,
  className,
}: UserAvatarType) {
  return (
    <Image
      src={src || "/avatar.jpg"}
      width={width}
      height={height}
      alt={"avatar"}
      className={cn(
        `rounded-full border w-[${width}px] h-[${height}px] object-cover aspect-[1]`,
        className
      )}
      onClick={() => onClick && onClick()}
      // priority
    />
  );
}
