import styles from "./FedExAd.module.css";

import Image from "next/image";

import fedExAdImage from "@/assets/fedExAd.png";

const FedExAd = () => {
  return (
    <div className={styles.fedExAdContainer}>
      <div className={styles.infoContainer}>
        <h2>We upgraded our shipments many levels up.</h2>
        <p>
          Now powered up by <p>FedEx</p>
        </p>
      </div>
      <Image
        className={styles.imageContainer}
        src={fedExAdImage.src}
        alt="products-ad"
        width={500}
        height={300}
      />
    </div>
  );
};

export default FedExAd;
