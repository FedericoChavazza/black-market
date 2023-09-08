"use client";

import VerticalCard from "@/components/Card/VerticalCard";
import Filters from "@/components/Filters/Filters";
import { useProducts } from "@/context/ProductsContext";

import styles from "./page.module.css";

import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/Utils/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import Select, { Option } from "@/components/Utils/Select/Select";
import { Products } from "@/interfaces";

const orderOptions = [
  { id: 1, label: "Most Recent", value: "recent" },
  { id: 2, label: "Oldest", value: "oldest" },
];

const AllProducts = () => {
  const { get } = useSearchParams();

  const { push } = useRouter();

  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptionOrder, setSelectedOptionOrder] = useState<Option>(
    orderOptions[0]
  );
  const productsPerPage = 6;

  const searchValue = get("search") ?? "";

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClearSearch = () => {
    push("/dashboard/products");
  };

  const handleSelectedOptionOrder = (value: Option) => {
    setSelectedOptionOrder(value);
  };

  const getSortFunction = useCallback(
    (a: Products, b: Products) => {
      if (selectedOptionOrder.value === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    },
    [selectedOptionOrder]
  );

  const memoCurrentProducts = useMemo(() => {
    return currentProducts
      .filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(searchValue?.toLowerCase() ?? "") && searchValue !== null
      )
      .sort(getSortFunction);
  }, [selectedOptionOrder, searchValue, currentProducts, getSortFunction]);

  return (
    <div className={styles.productsContainer}>
      <div className={styles.filtersContainer}>
        <Filters />
      </div>
      <div className={styles.products}>
        <div className={styles.userFilters}>
          {searchValue && (
            <div className={styles.searchTitle}>
              You have searched for "
              {<div className={styles.searchValue}>{searchValue}</div>}"
              <Button
                className={styles.deleteSearchValue}
                color="none"
                onClick={handleClearSearch}
              >
                x
              </Button>
            </div>
          )}
          <div className={styles.selectContainer}>
            <div className={styles.selectTitle}>
              Sort by
              <Select
                options={orderOptions}
                value={selectedOptionOrder}
                onChange={handleSelectedOptionOrder}
                customWidth={15}
              />
            </div>
          </div>
        </div>
        <div className={styles.product}>
          {memoCurrentProducts.map((product) => (
            <VerticalCard product={product} key={product.id} />
          ))}
        </div>

        <div className={styles.pagination}>
          <Button color="none" onClick={prevPage}>
            {`<  Previous Page`}
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button color="none" onClick={nextPage}>
            {`Next Page  >`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
