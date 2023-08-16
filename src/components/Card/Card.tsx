import { useAuth } from "@/context/AuthContext";
import { Products } from "@/interfaces";
import CustomLabel from "../Utils/CustomLabel/CustomLabel";
import Heart from "../Utils/Heart/Heart";
import Image from "next/image";

import styles from "./Card.module.css";
import Button from "../Utils/Button/Button";
import { useRouter } from "next/navigation";

const Card = ({ product }: { product: Products }) => {
  const { user } = useAuth();

  const { push } = useRouter();

  return (
    user && (
      <Button
        onClick={() => push(`/dashboard/${product.id}`)}
        color="none"
        className={styles.cardContainer}
      >
        <div className={styles.upperPart}>
          <Image
            priority
            src={product.image[0]}
            alt={product.name}
            height={248}
            width={264}
          />
        </div>
        <div className={styles.lowerPart}>
          <div>
            <h3>{product.price}$</h3>
            <CustomLabel variant={product.state}>{product.state}</CustomLabel>
          </div>
          <div>
            <h3>{product.name}</h3>
            <Heart productId={product.id} />
          </div>
        </div>
      </Button>
    )
  );
};

export default Card;
