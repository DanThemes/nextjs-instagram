import React from "react";

export default function TopBar() {
  return (
    <div className="border-b border-solid border-b-1 border-[#DBDBDB]">
      <div className="flex justify-between px-10 py-5 w-[70rem] mx-auto">
        <div>Instagram</div>
        <div className="flex gap-3">
          <button className="blue_button">Log In</button>
          <button className="">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
