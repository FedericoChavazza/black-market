import { useProducts } from "@/context/ProductsContext";
import Spinner from "../Utils/Spinner/Spinner";
import styles from "./Details.module.css";

import Image from "next/image";
import Heart from "../Utils/Heart/Heart";

import { LiaTimesSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import CustomLabel from "../Utils/CustomLabel/CustomLabel";
import Button from "../Utils/Button/Button";
import { useAuth } from "@/context/AuthContext";
import Input from "../Utils/Input/Input";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ id }: { id: string }) => {
  const { product, addProductToCart } = useProducts();

  const { user, setExtendedUser } = useAuth();
  const [availability, setAvailability] = useState({
    value: 0,
    message: `Availability: 0 items`,
  });

  const renderImage = (image: string, index: number) => (
    <Image key={index} src={image} alt="little_image" width={50} height={50} />
  );

  useEffect(() => {
    if (product) {
      setAvailability({
        ...availability,
        message: `Availability: ${product.availability} items`,
      });
    }
  }, [product]);

  const { back } = useRouter();

  const handleGoBack = () => back();

  const renderRemainingCount = (
    remainingCount: number,
    image: string,
    index: number
  ) => (
    <div
      key={index}
      className={styles.missingImages}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {`+${remainingCount}`}
    </div>
  );

  const imagesToShow = product?.image.slice(1);
  const remainingCount = product && product?.image.length - 3;

  const handleAddToCart = async () => {
    if (user && product && !displayQuantityMessage(availability.value).error) {
      const buildedProduct = {
        ...product,
        quantity: availability.value,
      };

      setAvailability({
        ...availability,
        message: `Availability: ${product.availability} items`,
      });

      console.log(availability.value);
      addProductToCart(user.uid, product, availability.value).then((response) =>
        console.log(response)
      );

      setExtendedUser((prev) =>
        prev ? { ...prev, cart: [...prev.cart, buildedProduct] } : null
      );
    } else {
      setAvailability({
        ...availability,
        message: displayQuantityMessage(availability.value).message,
      });
    }
  };

  const addedToCartCheck = !!user?.cart.find((prod) => prod.id === id);

  const displayQuantityMessage = (
    quantity: number
  ): { error: boolean; message: string } => {
    if (product?.availability) {
      if (quantity > product.availability) {
        return {
          error: true,
          message: "Not enough items!",
        };
      }
      if (product.availability === 0) {
        return {
          error: true,
          message: "There is no stock left!",
        };
      }

      return {
        error: false,
        message: `Availability: ${product.availability} items`,
      };
    }

    return {
      error: true,
      message: "Product availability is unknown",
    };
  };

  const cannotAddToCart =
    displayQuantityMessage(availability.value).error ||
    availability.value === 0;

  return (
    <div className={styles.detailsContainer}>
      <LiaTimesSolid
        onClick={handleGoBack}
        className={styles.timesCross}
        size={20}
      />
      {product ? (
        <>
          <div className={styles.imagesContainer}>
            <div className={styles.bigImageContainer}>
              <Image
                className={styles.bigImage}
                src={product.image[0]}
                alt="product_main_image"
                width={500}
                height={300}
              />
              <Heart product={product} className={styles.heart} />
            </div>
            <div className={styles.littleImagesContainer}>
              {imagesToShow?.map((image, index) =>
                index < 2
                  ? renderImage(image, index)
                  : index === 2
                  ? renderRemainingCount(remainingCount as number, image, index)
                  : null
              )}
            </div>
          </div>
          <div className={styles.productInfoContainer}>
            <div className={styles.mainDetails}>
              <h1>{product.name}</h1>
              <span className={styles.corp}>{`By ${product.corp} co.`}</span>
              <CustomLabel variant={product.state}>{product.state}</CustomLabel>
              <span className={styles.price}>{`${product.price}$`}</span>
            </div>
            <div className={styles.productDescriptionContainer}>
              <h2>Product description</h2>
              <span>{product.description}</span>
            </div>
            <div className={styles.userInteractions}>
              <div className={styles.buttonsContainer}>
                <label>Items</label>
                <Input
                  onChange={(event) =>
                    setAvailability({
                      ...availability,
                      message: displayQuantityMessage(+event.target.value)
                        .message,
                      value: +event.target.value,
                    })
                  }
                  type="number"
                  min={0}
                  max={product.availability}
                  className={
                    displayQuantityMessage(availability.value).error
                      ? styles.errorAvailabilityBox
                      : undefined
                  }
                  placeholder="0"
                />
              </div>
              <div className={styles.addToCart}>
                <label
                  className={
                    displayQuantityMessage(availability.value).error
                      ? styles.errorAvailability
                      : undefined
                  }
                >
                  {availability.message}
                </label>

                <Button
                  disabled={addedToCartCheck || cannotAddToCart}
                  onClick={handleAddToCart}
                >
                  {addedToCartCheck ? "Added to cart" : "Add to cart"}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner size={25} />
      )}
    </div>
  );
};

export default ProductDetails;
