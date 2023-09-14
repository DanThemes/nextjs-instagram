import React, { useState } from "react";

export default function useModal() {
  const [show, setShow] = useState<boolean>(false);

  const toggle = () => {
    setShow((prev) => !prev);
  };

  return { isOpen: show, toggle };
}
