import Button from "../Utils/Button/Button";
import CustomLabel from "../Utils/CustomLabel/CustomLabel";
import styles from "./Card.module.css";

import Image from "next/image";
import { Products } from "@/interfaces";
import QuantityHandler from "./Utils/QuatityHandler";
import { useProducts } from "@/context/ProductsContext";
import { useAuth } from "@/context/AuthContext";

const VerticalCartCard = ({ product }: { product: Products }) => {
  const { removeProductFromCart } = useProducts();
  const { user, setExtendedUser } = useAuth();

  const handleRemoveProductFromCart = async () => {
    if (user) {
      const filteredCart = user.cart.filter(
        (cartProduct) => cartProduct.id !== product.id
      );
      setExtendedUser((prev) =>
        prev ? { ...prev, cart: filteredCart } : null
      );
      await removeProductFromCart(user.uid, product.id);
    }
  };

  return (
    <div className={styles.verticalCartCard}>
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
          <Button
            color="none"
            onClick={handleRemoveProductFromCart}
            className={styles.removeItems}
          >
            Remove Item
          </Button>
        </div>
        <div className={styles.userInteractionProduct}>
          <h2>{`$${product.price}`}</h2>
          <QuantityHandler
            availability={product.availability}
            quantity={product.quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default VerticalCartCard;
