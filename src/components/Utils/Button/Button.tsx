"use client";

import styles from "./Button.module.css";
import { clsx } from "clsx";
import Image from "next/image";
import { MutableRefObject } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "no-padding";
  color?: "primary" | "secondary" | "none";
  icon?: string;
  ref?: MutableRefObject<null>;
}

function Button({
  children,
  onClick,
  variant = "contained",
  color = "primary",
  className,
  icon,
  ref,
  ...props
}: ButtonProps) {
  const classnames = clsx({
    [styles.containedPrimaryButton]:
      color === "primary" && variant === "contained",
    [styles.noPaddingPrimaryButton]:
      color === "primary" && variant === "no-padding",
    [styles.containedSecondaryButton]:
      color === "secondary" && variant === "contained",
    [styles.containedNoneButton]: color === "none" && variant === "contained",
  });

  return (
    <button
      ref={ref}
      className={`${
        color !== "none" && styles.button
      } ${classnames} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <Image src={icon} alt="icon" width={20} height={20} />}
      {children}
    </button>
  );
}

export default Button;
