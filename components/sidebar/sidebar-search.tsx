import cn from "@/utils/utils";
import React from "react";
import { motion } from "framer-motion";

type SidebarSearchProps = {
  searchOpen: boolean;
};

export default function SidebarSearch({ searchOpen }: SidebarSearchProps) {
  return (
    <motion.div
      className={cn(
        "absolute bg-white top-0 left-[-100%] border-r border-solid  border-[#DBDBDB] h-full px-3 py-3"
      )}
      animate={{ left: searchOpen ? "100%" : "-100%" }}
    >
      <h4 className="text-2xl">Search</h4>
      <input
        type="text"
        className="bg-neutral-100 rounded-[0.5rem] py-3 my-8"
      />
      <p className="font-bold">Recent</p>
      {/* 
      TODO: save to localStorage the recent username searches
            and display them here if they exist
      */}
    </motion.div>
  );
}
