"use client";

import { auth } from "@/services/firebase";
import Button from "../Utils/Button/Button";

import styles from "./Logout.module.css";

const Logout = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <Button className={styles.logoutContainer} onClick={handleSignOut}>
      Log out
    </Button>
  );
};

export default Logout;
