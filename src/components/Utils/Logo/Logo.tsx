import Image from "next/image";

import logoBlack from "@/assets/Logo.png";
import logoWhite from "@/assets/LogoWhite.png";

import styles from "./Logo.module.css";

interface LogoProps {
  color?: "black" | "white";
  onClick?: () => void;
  cursor?: "pointer" | "none";
}

const Logo = ({ color = "black", onClick, cursor = "none" }: LogoProps) => (
  <Image
    style={{ cursor: cursor }}
    onClick={onClick}
    className={styles.logo}
    src={color === "black" ? logoBlack : logoWhite}
    alt="logo"
  />
);

export default Logo;
