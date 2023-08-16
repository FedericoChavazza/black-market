import React, { useState, useEffect } from "react";
import styles from "./Heart.module.css";
import { FaHeart } from "react-icons/fa";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";

interface HeartProps {
  productId: string;
  className?: string;
}

const Heart = ({ productId, className }: HeartProps) => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const userId = user?.uid;
  const userRef = userId ? doc(db, "users", userId) : null;

  useEffect(() => {
    if (user?.likedProducts) {
      setIsActive(user.likedProducts.includes(productId));
    }
  }, [user, productId]);

  const handleClick = async (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (userRef) {
      if (isActive) {
        setIsActive(false);
        await updateDoc(userRef, {
          likedProducts: arrayRemove(productId),
        });
      } else {
        setIsActive(true);
        await updateDoc(userRef, {
          likedProducts: arrayUnion(productId),
        });
      }
    }
  };

  return (
    <FaHeart
      className={`${styles.heartIcon} ${
        isActive ? styles.active : ""
      } ${className}`}
      fill="#6b6b6b"
      onClick={handleClick}
      size={17}
    />
  );
};

export default Heart;
