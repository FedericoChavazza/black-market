import Category from "./Category/Category";
import Conditions from "./Conditions/Conditions";
import PriceLimit from "./PriceLimit/PriceLimit";

import styles from "./Filters.module.css";
import Button from "../Utils/Button/Button";
import { useFilters } from "@/context/FiltersContext";

const Filters = () => {
  const { saveFilters } = useFilters();

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.title}>Filters</h3>
      <Conditions />
      <Category />
      <PriceLimit />
      <Button onClick={saveFilters}>See Results</Button>
    </div>
  );
};

export default Filters;
