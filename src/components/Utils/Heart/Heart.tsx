import React, { useState, useEffect } from "react";
import styles from "./Heart.module.css";
import { FaHeart } from "react-icons/fa";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext";
import { Products } from "@/interfaces";

interface HeartProps {
  product: Products;
  className?: string;
}

const Heart = ({ product, className }: HeartProps) => {
  const { user, setExtendedUser } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const userId = user?.uid;
  const userRef = userId ? doc(db, "users", userId) : null;

  useEffect(() => {
    if (user?.likedProducts) {
      setIsActive(
        !!user.likedProducts.find(
          (likedProduct) => likedProduct.id === product.id
        )
      );
    }
  }, [user, product.id]);

  const handleClick = async (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (userRef) {
      if (isActive) {
        setIsActive(false);
        setExtendedUser((prev) =>
          prev
            ? {
                ...prev,
                likedProducts: prev.likedProducts.filter(
                  (lp) => lp.id !== product.id
                ),
              }
            : null
        );
        await updateDoc(userRef, {
          likedProducts: arrayRemove(product),
        });
      } else {
        setIsActive(true);
        setExtendedUser((prev) =>
          prev
            ? { ...prev, likedProducts: [...prev.likedProducts, product] }
            : null
        );
        await updateDoc(userRef, {
          likedProducts: arrayUnion(product),
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
