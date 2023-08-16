"use client";

import Spinner from "../Utils/Spinner/Spinner";

import styles from "./Dashboard.module.css";
import Card from "../Card/Card";
import Payments from "../Payments/Payments";
import ProductsAd from "../Adverts/Products/ProductsAd";
import { useProducts } from "@/context/ProductsContext";
import FedExAd from "../Adverts/FedEx/FedExAd";
import Link from "next/link";

const Dashboard = () => {
  const { products, loadingProducts } = useProducts();
  return (
    <div className={styles.productsContainer}>
      {!loadingProducts ? (
        <>
          <div className={styles.cardsContainer}>
            {products.slice(0, 4).map((product) => {
              return <Card key={product.id} product={product} />;
            })}
          </div>
          <Link href="/dashboard/products">See all</Link>
        </>
      ) : (
        <div className={styles.spinnerContainer}>
          <Spinner size={40} color="#F4F7FA" />
        </div>
      )}

      <ProductsAd />
      <Payments />
      <FedExAd />
    </div>
  );
};

export default Dashboard;
