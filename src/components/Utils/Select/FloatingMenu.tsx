import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { SetterFunction } from "@/interfaces";
import React, { useRef } from "react";
import styles from "./Select.module.css";

interface FloatingMenuProps {
  children: React.ReactNode;
  setOpen: SetterFunction<boolean>;
  open: boolean;
  position?: "left" | "right" | "center";
  width?: string;
}

const FloatingMenu = ({
  children,
  setOpen,
  open,
  width,
}: FloatingMenuProps) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(setOpen, open, anchorRef);

  return (
    <div
      ref={anchorRef}
      className={styles.floatingMenuContainer}
      style={{ width: `${width}rem` }}
    >
      {children}
    </div>
  );
};

export default FloatingMenu;
