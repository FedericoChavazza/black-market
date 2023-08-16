import Input from "@/components/Utils/Input/Input";
import { useFilters } from "@/context/FiltersContext";

const PriceLimit = () => {
  const { setMaxPrice, setMinPrice, minPrice, maxPrice } = useFilters();

  return (
    <div>
      <h3>Price</h3>
      <Input
        type="number"
        value={minPrice !== null ? minPrice.toString() : ""}
        onChange={(event) =>
          setMinPrice(event.target.value ? +event.target.value : null)
        }
        placeholder="Type minimum"
        label="Min"
      />
      <Input
        type="number"
        value={maxPrice !== null ? maxPrice.toString() : ""}
        onChange={(event) =>
          setMaxPrice(event.target.value ? +event.target.value : null)
        }
        placeholder="Type maximum"
        label="Max"
      />
    </div>
  );
};

export default PriceLimit;
