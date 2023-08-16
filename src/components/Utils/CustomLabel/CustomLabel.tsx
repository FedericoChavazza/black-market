import clsx from "clsx";

import styles from "./CustomLabel.module.css";

interface CustomLabelProps {
  variant: "New" | "Restored";
  children: React.ReactNode;
}

const CustomLabel = ({ variant, children }: CustomLabelProps) => {
  const classname = clsx({
    [styles.newLabel]: variant === "New",
    [styles.restoredLabel]: variant === "Restored",
  });

  return <label className={classname}>{children}</label>;
};

export default CustomLabel;
