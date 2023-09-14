"use client";

import React from "react";
import { GoX } from "react-icons/go";
import { motion } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, toggle, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      className="w-full h-full fixed inset-0 z-[10] flex items-center justify-center"
      animate={{ scale: 1.1 }}
    >
      <div
        className="bg-black/90 z-[11] w-full h-full absolute"
        onClick={toggle}
      ></div>
      <div className="w-[40rem] z-[12] bg-white rounded-lg relative">
        <div
          className="text-3xl absolute -top-[3rem] right-0 text-white cursor-pointer hover:text-white/50"
          onClick={toggle}
        >
          <GoX />
        </div>
        <div className="border-0 border-b p-10">
          <h3 className="text-2xl">Change Profile Photo</h3>
        </div>
        <div className="p-10">{children}</div>
      </div>
    </motion.div>
  );
}
