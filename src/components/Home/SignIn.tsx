"use client";

import firebase from "firebase/compat/app";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Home.module.css";
import Input from "../Utils/Input/Input";
import Button from "../Utils/Button/Button";
import Logo from "../Utils/Logo/Logo";
import GoogleIcon from "@/assets/Google_Logo.webp";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const handleSignInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

const SignIn = () => {
  const { push } = useRouter();
  const { setJustSignedUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => setJustSignedUp(false))
      .catch((error) => {
        setMessage("The email or password are incorrect.");
      });
  };

  const handlePathSignUp = () => push("/auth/sign-up");

  return (
    <>
      <div className={styles.authContainer}>
        <Logo />
        <div className={styles.fieldsContainer}>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            placeholder="Type your email"
            type="text"
            name="text"
          />
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            placeholder="Type your password"
            type="password"
            name="password"
          />
          <Button onClick={handleSignIn}>Log In</Button>
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignInWithGoogle}
          icon={GoogleIcon.src}
        >
          Sign In with Google
        </Button>
        <p className={styles.errorMessage}>{message}</p>
        <Link href="/auth/forgot-password" className={styles.forgotPassword}>
          I forgot my password.
        </Link>
      </div>
      <div className={styles.handlePageContainer}>
        <span className={styles.spanSize}>Dont have an account?</span>
        <Button
          onClick={handlePathSignUp}
          variant="contained"
          color="secondary"
        >
          Sign In
        </Button>
      </div>
    </>
  );
};

export default SignIn;
