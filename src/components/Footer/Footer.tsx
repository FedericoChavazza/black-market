"use client";

import { useState } from "react";
import Button from "../Utils/Button/Button";
import Input from "../Utils/Input/Input";
import styles from "./Footer.module.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}></div>
      <div className={styles.subscribeContent}>
        <h2>Subscribe to our weekly newsletter!</h2>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          label="Email"
        />
        <Button
          className={styles.customButton}
          variant="contained"
          color="primary"
          onClick={() => {}}
        >
          Subscribe
        </Button>
        <p>
          By subscribing you agree to receive weekly emails with our latest news
          and updates.
        </p>
      </div>
    </div>
  );
};

export default Footer;
