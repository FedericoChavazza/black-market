import styles from "./ProductsAd.module.css";

import productsAdImage from "@/assets/productAd.png";
import Image from "next/image";

const ProductsAd = () => {
  return (
    <div className={styles.productsAdContainer}>
      <Image
        className={styles.imageContainer}
        src={productsAdImage.src}
        alt="products-ad"
        width={500}
        height={300}
      />

      <div className={styles.infoContainer}>
        <h2>Check our new and restored furniture</h2>
        <p>Shop today and recieve a special 10% discount</p>
      </div>
    </div>
  );
};

export default ProductsAd;
