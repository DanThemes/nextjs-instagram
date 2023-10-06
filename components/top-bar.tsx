"use client";

import useAuthModal from "@/hooks/useAuthModal";
import React from "react";
import AuthModal from "./modals/auth-modal";
import Link from "next/link";

export default function TopBar() {
  const authModal = useAuthModal();

  return (
    <div className="border-b border-solid border-b-1 border-[#DBDBDB]">
      <div className="flex justify-between items-center px-10 py-5 w-auto lg:w-[70rem] mx-auto">
        <div>
          <Link href="/">Instagram</Link>
        </div>
        <div className="flex gap-3">
          <button
            className="blue_button"
            onClick={() => {
              authModal.toggle();
              authModal.setTab("login");
            }}
          >
            Log In
          </button>
          <button
            onClick={() => {
              authModal.toggle();
              authModal.setTab("register");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
