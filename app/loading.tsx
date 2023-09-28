import React from "react";
import { GoSync } from "react-icons/go";

export default function Loading() {
  return (
    <div className="animate-spin w-[1rem]">
      <GoSync />
    </div>
  );
}
