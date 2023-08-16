"use client";

import { useState } from "react";

import styles from "./SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../Utils/Input/Input";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchBar, setSearchBar] = useState("");

  const { push } = useRouter();

  const handleOnEnterSearch = () => {
    if (searchBar) {
      push(`/dashboard/products?search=${searchBar}`);
    }
  };

  const date = new Date();

  console.log(date);

  return (
    <Input
      className={styles.inputSearch}
      value={searchBar}
      onChange={(event) => setSearchBar(event.target.value)}
      type="text"
      placeholder="Search for products"
      icon={<AiOutlineSearch size={20} />}
      iconPosition="end"
      onEnter={handleOnEnterSearch}
    />
  );
};

export default SearchBar;
