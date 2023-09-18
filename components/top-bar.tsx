"use client";

import useAuthModal from "@/hooks/useAuthModal";
import React from "react";

export default function TopBar() {
  const authModal = useAuthModal();

  return (
    <div className="border-b border-solid border-b-1 border-[#DBDBDB]">
      <div className="flex justify-between items-center px-10 py-5 w-[70rem] mx-auto">
        <div>Instagram</div>
        <div className="flex gap-3">
          <button className="blue_button" onClick={() => authModal.toggle()}>
            Log In
          </button>
          <button className="">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
