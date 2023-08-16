import Image from "next/image";
import styles from "./Payments.module.css";

import bitcoin from "@/assets/BitCoin.png";
import paypal from "@/assets/Paypal.png";
import creditCard from "@/assets/CreditCard.png";

const Payments = () => {
  const renderBorderline = () => {
    return <div className={styles.borderline} />;
  };

  return (
    <div className={styles.paymentsContainer}>
      <h2 className={styles.paymentsTitle}>Payments Methods</h2>
      <div className={styles.payments}>
        <div>
          <Image
            src={creditCard.src}
            alt="credit card"
            width={70}
            height={55}
          />
          Credit
        </div>
        {renderBorderline()}
        <div>
          <Image src={paypal.src} alt="paypal" width={64} height={71} />
          Paypal
        </div>
        {renderBorderline()}
        <div>
          <Image src={bitcoin.src} alt="bitcoin" width={64} height={71} />
          Crypto
        </div>
      </div>
    </div>
  );
};

export default Payments;
