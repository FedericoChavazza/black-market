"use client";

import clsx from "clsx";
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onEnter?: () => void;
  error?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  width?: string;
  className?: string;
}

const Input = ({
  label,
  value,
  onChange,
  onEnter,
  error,
  placeholder,
  className,
  type,
  fullWidth = false,
  icon,
  iconPosition = "start",
  name,
  width,
  ...props
}: InputProps) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(event);
  };
  const handleOnKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event?.key === "Enter") {
      onEnter?.();
    }
  };

  const id = useId();

  const inputClass = clsx({
    [styles.input]: !fullWidth && !icon,
    [styles.inputFullWidth]: fullWidth && !icon,
    [styles.inputWithIconLeft]: !fullWidth && iconPosition === "start" && icon,
    [styles.inputWithIconRight]: !fullWidth && iconPosition === "end" && icon,
    [styles.inputWithIconFullWidth]: fullWidth && icon,
    [styles.errorBorder]: error,
  });

  const inputElement = (
    <input
      id={id}
      aria-describedby={`${id}-error`}
      className={`${inputClass} ${className}`}
      style={width ? { width } : {}}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
      onKeyDown={handleOnKeyDown}
      {...props}
    />
  );

  return (
    <div className={!label ? styles.noLabel : styles.wrapper}>
      <label className={styles.labelContainer}>{label}</label>
      <>
        <div className={styles.inputWrapper}>
          {icon && iconPosition === "start" && (
            <div className={styles.iconStart}>{icon}</div>
          )}
          {inputElement}
          {icon && iconPosition === "end" && (
            <div className={styles.iconEnd}>{icon}</div>
          )}
        </div>
        {error && !!error.length && (
          <span id={`${id}-error`} role="alert" className={styles.error}>
            {error}
          </span>
        )}
      </>
    </div>
  );
};

export default Input;
