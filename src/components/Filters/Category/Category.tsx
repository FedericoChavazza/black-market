import Button from "@/components/Utils/Button/Button";
import Input from "@/components/Utils/Input/Input";
import { useFilters } from "@/context/FiltersContext";
import { useState } from "react";

import styles from "./Category.module.css";

const Category = () => {
  const { category, setCategory } = useFilters();

  const [inputValue, setInputValue] = useState("");

  const handleSearchCategory = () => {
    if (inputValue && !category.find((singleCat) => singleCat === inputValue)) {
      setCategory([...category, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteCategory = (singleCat: string) => {
    setCategory(category.filter((element) => element !== singleCat));
  };

  return (
    <div>
      <h3>Category</h3>
      <div className={styles.inputContainer}>
        <Input
          value={inputValue}
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Search Category..."
        />
        <Button
          className={styles.buttonSearchContainer}
          onClick={handleSearchCategory}
        >
          Search
        </Button>
      </div>

      <div className={styles.labelContainer}>
        {category.map((singleCat) => (
          <div>
            <div className={styles.fontSizeLabel}>{singleCat}</div>
            <Button
              color="none"
              onClick={() => handleDeleteCategory(singleCat)}
              className={styles.buttonLabelContainer}
            >
              x
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
