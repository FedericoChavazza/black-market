"use client";
import clsx from "clsx";

import { useId, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import FloatingMenu from "./FloatingMenu";
import Input from "../Input/Input";
import styles from "./Select.module.css";

export interface Option {
  id?: number;
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
  placeholder?: string;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  error?: string;
  customWidth?: number;
}

const Select = ({
  options,
  onChange,
  placeholder,
  value,
  label,
  disabled = false,
  error,
  customWidth,
}: CustomSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const id = useId();

  return (
    <div
      className={clsx(styles.selectWrapper)}
      style={{ width: `${customWidth}rem` }}
    >
      <Input
        id={id}
        value={value.label}
        onChange={() => {}}
        label={label || undefined}
        onClick={() => {
          if (!disabled) {
            setOpen(true);
          }
        }}
        placeholder={placeholder}
        icon={<BiChevronDown />}
        iconPosition="end"
        readOnly
        disabled={disabled}
      />
      {error !== undefined && (
        <span className={styles.errorMessage}>{error}</span>
      )}
      {open && (
        <FloatingMenu
          open={open}
          setOpen={setOpen}
          position="left"
          width={customWidth?.toString()}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={styles.option}
            >
              {option.label}
            </option>
          ))}
        </FloatingMenu>
      )}
    </div>
  );
};

export default Select;
