"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import {
  doc,
  getDocs,
  collection,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { Products } from "@/interfaces";
import { useFilters } from "./FiltersContext";

type ProductsContextType = {
  products: Products[];
  loadingProducts: boolean;
  product: Products | null;
  getProductById: (id: string) => Promise<void>;
  addProductToCart: (
    userId: string | undefined,
    product: Products
  ) => Promise<void>;
  addQuantityToProduct: (
    quantity: number,
    availability: number,
    id: string
  ) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { savedFilters } = useFilters();
  const [products, setProducts] = useState<Products[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [product, setProduct] = useState<Products | null>(null);

  const getProductCollection = collection(db, "products");

  const getProductById = async (id: string) => {
    if (product && product.id === id) {
      return;
    }

    const productRef = doc(db, "products", id);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      setProduct({
        ...productSnapshot.data(),
        id: productSnapshot.id,
      } as Products);
    } else {
      throw new Error("Product does not exist");
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(getProductCollection);
      const allProducts: Products[] = data.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as Products)
      );

      const filteredData = allProducts.filter(
        (product) =>
          (savedFilters.state ? product.state === savedFilters.state : true) &&
          (savedFilters.category.length > 0
            ? savedFilters.category.some((searchTerm) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : true) &&
          (savedFilters.minPrice !== null
            ? product.price >= savedFilters.minPrice
            : true) &&
          (savedFilters.maxPrice !== null
            ? product.price <= savedFilters.maxPrice
            : true)
      );

      setProducts(filteredData);
      setLoadingProducts(false);
    };

    getProducts();
  }, [savedFilters]);

  const addProductToCart = async (
    userId: string | undefined,
    product: Products
  ) => {
    if (userId) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        cart: arrayUnion(product),
      });
    }
  };

  const addQuantityToProduct = async (
    quantity: number,
    availability: number,
    id: string
  ) => {
    const productRef = doc(db, "products", id);

    await updateDoc(productRef, {
      quantity: quantity,
      availability: availability,
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadingProducts,
        product,
        getProductById,
        addProductToCart,
        addQuantityToProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
