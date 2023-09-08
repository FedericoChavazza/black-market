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
import { useAuth } from "./AuthContext";

type ProductsContextType = {
  products: Products[];
  loadingProducts: boolean;
  product: Products | null;
  getProductById: (id: string) => Promise<void>;
  addProductToCart: (
    userId: string | undefined,
    product: Products,
    quantity: number
  ) => Promise<void>;
  removeProductFromCart: (userId: string, productId: string) => Promise<void>;
  refreshCartProducts: (userId: string) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setExtendedUser } = useAuth();

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
    product: Products,
    quantity: number
  ) => {
    if (userId) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        cart: arrayUnion({ ...product, quantity }),
      });
    }
  };

  const removeProductFromCart = async (
    userId: string | undefined,
    productId: string
  ) => {
    if (userId) {
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      const updatedCart = user?.cart.filter(
        (item: Products) => item.id !== productId
      );
      await updateDoc(userRef, { cart: updatedCart });
    }
  };

  const refreshCartProducts = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const cart = userData.cart || [];
      setExtendedUser((prev) => {
        if (prev) {
          return {
            ...prev,
            cart,
          };
        }
        return null;
      });
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadingProducts,
        product,
        getProductById,
        addProductToCart,
        removeProductFromCart,
        refreshCartProducts,
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
