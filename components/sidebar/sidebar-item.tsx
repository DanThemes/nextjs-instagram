"use client";

import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib/esm/iconBase";

type SidebarItemProps = {
  icon?: IconType;
  name: string;
  link: string;
};

const SidebarItem = ({ icon: Icon, name, link }: SidebarItemProps) => {
  return (
    <div className="group px-2 py-1">
      <Link href={link}>
        <div className="group group-hover:bg-neutral-100 transition flex items-center rounded-md p-2 group-active:opacity-50">
          <span className="mr-3">
            {Icon && (
              <Icon
                size="1.5rem"
                className="group-hover:scale-105 group-active:scale-95 transition"
              />
            )}
          </span>
          <span>{name}</span>
        </div>
      </Link>
    </div>
  );
};

export default SidebarItem;