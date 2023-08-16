import Image from "next/image";
import homeBackground from "@/assets/home_background.png";

import styles from "./layout.module.css";

export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.authContainer}>{children}</div>
      <Image
        className={styles.backgroundImage}
        src={homeBackground}
        alt="home_background"
      />
    </div>
  );
}
