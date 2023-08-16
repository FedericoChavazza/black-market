"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "@/services/firebase";

import styles from "./Home.module.css";
import Button from "../Utils/Button/Button";
import Input from "../Utils/Input/Input";
import Logo from "../Utils/Logo/Logo";
import { useAuth } from "@/context/AuthContext";

const SignUp = () => {
  const { push } = useRouter();
  const { setJustSignedUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlePathSignIn = () => push("/auth/sign-in");

  const handleSignUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (credentials) => {
          try {
            db.collection("users").doc(credentials.user.uid).set({
              likedProducts: [],
              boughtProducts: [],
            });
            setJustSignedUp(true);
            push("/auth/sign-in");
          } catch {
            console.log("Error! Account could not be created!");
          }
        }
      );
    } else {
      setErrors({
        ...errors,
        confirmPassword: "The passwords do not match!",
      });
    }
  };
  const buttonConditionDisabled = !email || !password || !confirmPassword;

  return (
    <div className={styles.authContainer}>
      <Logo />
      <div className={styles.fieldsContainer}>
        <Input
          label="Email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
        />
        <Button
          disabled={buttonConditionDisabled}
          color="secondary"
          onClick={handleSignUp}
        >
          Sign Up!
        </Button>
      </div>
      <div className={styles.handlePageContainer}>
        <span className={styles.spanSize}>
          By signing up, you accept the Data Policy and the Cookies Policy.
        </span>
        <span className={styles.spanSize}> You already have an account? </span>
        <Button onClick={handlePathSignIn}>Log In</Button>
      </div>
    </div>
  );
};

export default SignUp;
