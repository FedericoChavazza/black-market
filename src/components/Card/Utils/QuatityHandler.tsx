import Button from "@/components/Utils/Button/Button";
import { useState } from "react";
import styles from "../Card.module.css";

interface QuantityHandlerProps {
  quantity: number;
  availability: number;
}

const QuantityHandler = ({ quantity, availability }: QuantityHandlerProps) => {
  const getQuantity = () => quantity;

  const [quantityValue, setQuantityValue] = useState(getQuantity);

  const handleChangeQuantity = (cb: (prevState: number) => number) => {
    setQuantityValue(cb);
  };
  console.log(quantity, quantityValue);

  const disabledAddQuantity = availability <= quantityValue;

  const disabledSubstractQuantity = quantityValue <= 0;

  return (
    <div className={styles.handleQuantity}>
      <Button
        onClick={() => handleChangeQuantity((prevState) => prevState - 1)}
        color="none"
        disabled={disabledSubstractQuantity}
      >
        -
      </Button>
      <div>{quantityValue}</div>
      <Button
        onClick={() => handleChangeQuantity((prevState) => prevState + 1)}
        color="none"
        disabled={disabledAddQuantity}
      >
        +
      </Button>
    </div>
  );
};

export default QuantityHandler;
