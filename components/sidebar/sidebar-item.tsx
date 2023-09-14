"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib/esm/iconBase";
import cn from "@/utils/utils";

type SidebarItemProps = {
  icon?: IconType;
  name: string;
  link: string;
  modal?: React.ReactNode;
};

const SidebarItem = ({
  icon: Icon,
  name,
  link,
  modal: Modal,
}: SidebarItemProps) => {
  const pathname = usePathname();

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
          <span className={cn({ "font-bold": pathname === link })}>{name}</span>
        </div>
      </Link>
      {Modal && <Modal />}
    </div>
  );
};

export default SidebarItem;
