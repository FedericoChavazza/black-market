import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner = ({ size = 16, color = "#000000" }: SpinnerProps) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderTop: `3px solid ${color}`,
      }}
    />
  );
};

export default Spinner;
