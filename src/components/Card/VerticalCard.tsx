"use client";

import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductsContext";
import { Products } from "@/interfaces";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../Utils/Button/Button";
import CustomLabel from "../Utils/CustomLabel/CustomLabel";
import Heart from "../Utils/Heart/Heart";

import styles from "./Card.module.css";

const VerticalCard = ({ product }: { product: Products }) => {
  const { addProductToCart } = useProducts();
  const { user, setExtendedUser } = useAuth();
  const { push } = useRouter();

  const handleAddToCart = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (user && product) {
      await addProductToCart(user.uid, product, 1);

      setExtendedUser((prev) =>
        prev ? { ...prev, cart: [...prev.cart, product] } : null
      );
    }
  };

  const addedToCartCheck = !!user?.cart.find((prod) => prod.id === product.id);

  const handlePushToDetails = () => {
    push(`/dashboard/${product.id}`);
  };

  return (
    <Button
      onClick={handlePushToDetails}
      color="none"
      className={styles.verticalCard}
    >
      <div className={styles.imageContainer}>
        <Image
          src={product.image[0]}
          alt={product.name}
          width={50}
          height={50}
        />
      </div>
      <div className={styles.contentContainer}>
        <div>
          <div className={styles.productInfo}>
            <h2>{product.name}</h2>
            <CustomLabel variant={product.state}>{product.state}</CustomLabel>
          </div>
          <h2>{`$${product.price}`}</h2>
        </div>
        <div className={styles.userInteractionProduct}>
          <Heart product={product} />
          <Button disabled={addedToCartCheck} onClick={handleAddToCart}>
            {addedToCartCheck ? "Added to cart" : "Add to cart"}
          </Button>
        </div>
      </div>
    </Button>
  );
};

export default VerticalCard;
