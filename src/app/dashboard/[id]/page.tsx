"use client";

import ProductDetails from "@/components/Details/Details";
import { useProducts } from "@/context/ProductsContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Details = () => {
  const params = useParams();

  const { getProductById } = useProducts();

  useEffect(() => {
    getProductById(params.id);
  }, []);

  return <ProductDetails id={params.id} />;
};

export default Details;
