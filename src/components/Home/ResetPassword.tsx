"use client";

import React, { useState, useEffect } from "react";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/services/firebase";

import styles from "./Home.module.css";
import Button from "../Utils/Button/Button";
import { useRouter } from "next/navigation";
import Logo from "../Utils/Logo/Logo";
import Input from "../Utils/Input/Input";
import clsx from "clsx";

function ResetPassword() {
  const [code, setCode] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [colorMessage, setColorMessage] = useState<"default" | "red">(
    "default"
  );

  const { push } = useRouter();

  const displayMessage = (color: "default" | "red", msg: string) => {
    setColorMessage(color);
    setMessage(msg);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("oobCode");

    verifyPasswordResetCode(auth, code as string)
      .then((email) => {
        setMessage(`Enter a new password for ${email}`);
        setCode(code);
      })
      .catch(() => {
        displayMessage(
          "red",
          "Invalid or expired action code. Please request a new one."
        );
      });
  }, []);

  const handleRedirectToLogin = () => push("/auth/sign-in");

  const handleResetPassword = () => {
    if (newPassword === confirmNewPassword) {
      if (code) {
        confirmPasswordReset(auth, code, newPassword)
          .then(() => {
            displayMessage(
              "default",
              "Password has been reset. You can now log in with your new password."
            );
          })
          .catch((error) => {
            displayMessage("red", `Error resetting password: ${error.message}`);
          });
      } else {
        displayMessage("red", "The password reset code is not valid");
      }
    } else {
      displayMessage("red", "The passwords do not match");
    }
  };

  const fontColorError = clsx({
    [styles.defaultMessage]: colorMessage === "default",
    [styles.errorMessage]: colorMessage === "red",
  });

  return (
    <div className={styles.authContainer}>
      <Logo />
      <p className={styles.forgotPasswordSubtitle}>
        Please type and re-type your new password below.
      </p>
      <div className={styles.fieldsContainer}>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your password"
          label="Enter new password"
        />
        <Input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Re-enter your password"
          label="Re-type new password"
        />
      </div>
      <Button onClick={handleResetPassword} variant="contained" color="primary">
        Confirm new password
      </Button>
      <Button
        onClick={handleRedirectToLogin}
        variant="contained"
        color="secondary"
      >
        Go back to login
      </Button>

      {message && <p className={fontColorError}>{message}</p>}
    </div>
  );
}

export default ResetPassword;
