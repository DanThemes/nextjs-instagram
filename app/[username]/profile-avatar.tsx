"use client";

import Modal from "@/components/modal/modal";
import Image from "next/image";
import React, { useState } from "react";

export default function ProfileAvatar() {
  const [show, setShow] = useState<boolean>(false);

  const toggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <Image
        src="/avatar.jpg"
        width={150}
        height={150}
        alt={"avatar"}
        className="rounded-full border cursor-pointer"
        onClick={toggle}
      />
      <Modal isOpen={show} toggle={toggle} />
    </>
  );
}
