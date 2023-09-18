import React from "react";
import { GoSync } from "react-icons/go";

export default function Loading() {
  return (
    <div>
      <div className="animate-spin">
        <GoSync />
      </div>
    </div>
  );
}
