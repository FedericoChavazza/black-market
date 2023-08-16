"use client";

import { auth } from "@/services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Utils/Button/Button";
import Input from "../Utils/Input/Input";
import Logo from "../Utils/Logo/Logo";
import styles from "./Home.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { push } = useRouter();

  const handleBackToLogin = () => push("/auth/sign-in");

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/auth/sign-in",
      });
      console.log("Password reset email sent!");
      setMessage("");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setMessage("The email does not exist.");
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <Logo />
      <p className={styles.forgotPasswordSubtitle}>
        Please type your email address below in order to recover your password.
      </p>
      <Input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        label="Email"
        placeholder="Type your email"
        type="text"
        name="text"
        error={message}
      />
      <Button
        onClick={handleForgotPassword}
        variant="contained"
        color="primary"
      >
        Recover Password
      </Button>
      <Button onClick={handleBackToLogin} variant="contained" color="secondary">
        Go back to login
      </Button>
    </div>
  );
};

export default ForgotPassword;
