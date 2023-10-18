"use client";

import React from "react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="text-center">
      <h1 className="text-[2rem] pb-5">
        Sorry, this page isn&apos;t available.
      </h1>
      <p>
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link href="/" className="text-[#00376B] active:opacity-50">
          Go back to Instagram
        </Link>
        .
      </p>
    </div>
  );
};

export default PageNotFound;
