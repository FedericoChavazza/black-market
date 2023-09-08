"use client";

import VerticalCard from "@/components/Card/VerticalCard";
import VerticalCartCard from "@/components/Card/VerticalCartCard";
import Button from "@/components/Utils/Button/Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import styles from "./page.module.css";

const ShoppingCart = () => {
  const { user } = useAuth();

  const { push } = useRouter();

  const totalPrice = useMemo(() => {
    return (
      user?.cart.reduce((total, product) => total + +product.price, 0) || 0
    );
  }, [user?.cart]);

  const cartLengthCondition = !!user?.cart.length;
  const favouritesLengthCondition = !!user?.likedProducts?.length;

  console.log(user?.cart);

  return (
    <div className={styles.productsContainer}>
      <div className={styles.cartProducts}>
        <h1 className={styles.productsTitle}>My shopping cart</h1>
        {cartLengthCondition ? (
          user?.cart.map((product) => (
            <VerticalCartCard product={product} key={product.id} />
          ))
        ) : (
          <div className={styles.errorMessage}>
            There are no items in your cart yet, click
            <Button
              className={styles.redirectToProducts}
              color="none"
              onClick={() => push("/dashboard/products")}
            >
              here
            </Button>
            to add some!
          </div>
        )}
        {cartLengthCondition && (
          <div className={styles.totalPriceContainer}>
            <div>TOTAL</div>
            <div className={styles.divider} />
            <div className={styles.priceActions}>
              <div>{`${totalPrice}$`}</div>
              <Button>Go to checkout</Button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.cartProducts}>
        <h1 className={styles.productsTitle}>My favourites</h1>
        {favouritesLengthCondition ? (
          user?.likedProducts?.map((product) => (
            <VerticalCard product={product} key={product.id} />
          ))
        ) : (
          <div className={styles.errorMessage}>
            Add any favourite items any time you want!
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
