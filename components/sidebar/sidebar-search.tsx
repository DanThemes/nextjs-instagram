"use client";

import cn from "@/utils/utils";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import SidebarSearchResults from "./sidebar-search-results";
import { searchUsersByUsername } from "@/utils/api";
import { UserType } from "@/models/User";

type SidebarSearchProps = {
  searchOpen: boolean;
};

export default function SidebarSearch({ searchOpen }: SidebarSearchProps) {
  const [searchResults, setSearchResults] = useState<UserType[] | null>(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "d",
    },
  });

  const submitSearch = async (data: FieldValues) => {
    if (!data.username) return;

    const results = await searchUsersByUsername(data.username);
    console.log({ results });
    setSearchResults(results);
  };

  console.log({ searchResults });

  return (
    <motion.div
      className={cn(
        "absolute bg-white top-0 left-[-100%] border-r border-solid  border-[#DBDBDB] h-full px-3 py-3"
      )}
      animate={{
        left: searchOpen ? "100%" : "-100%",
        width: searchOpen ? "18rem" : "0rem",
      }}
    >
      <h4 className="text-2xl">Search</h4>
      <form onSubmit={handleSubmit(submitSearch)}>
        <input
          type="text"
          {...register("username")}
          placeholder="Search"
          className="bg-neutral-100 rounded-[0.5rem] p-3 my-8 outline-none w-full"
          autoComplete="off"
        />
      </form>
      <SidebarSearchResults results={searchResults} />
      {/* 
      TODO: save to localStorage the recent username searches
            and display them here if they exist
      */}
    </motion.div>
  );
}
