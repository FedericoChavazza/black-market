import React, { ChangeEvent } from "react";

import styles from "./Checkbox.module.css";

interface CheckboxProps {
  state: string;
  value: string;
  setState: (value: "New" | "Restored" | "") => void;
  label: string;
}

const Checkbox = ({ state, value, setState, label }: CheckboxProps) => {
  const handleCheckboxValue = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked ? (value as any) : "");
  };

  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        value={value}
        type="checkbox"
        onChange={handleCheckboxValue}
        checked={state === value}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
