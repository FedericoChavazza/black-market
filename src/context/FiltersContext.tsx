import React, { createContext, useState, useContext } from "react";

type FilterProps = {
  state: "New" | "Restored" | "";
  category: string[];
  minPrice: number | null;
  maxPrice: number | null;
};

type FilterContextType = {
  state: "New" | "Restored" | "";
  category: string[];
  minPrice: number | null;
  maxPrice: number | null;
  savedFilters: {
    state: "New" | "Restored" | "";
    category: string[];
    minPrice: number | null;
    maxPrice: number | null;
  };
  setState: (value: "New" | "Restored" | "") => void;
  setCategory: (value: string[]) => void;
  setMinPrice: (value: number | null) => void;
  setMaxPrice: (value: number | null) => void;
  saveFilters: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<"New" | "Restored" | "">("");
  const [category, setCategory] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [savedFilters, setSavedFilters] = useState<FilterProps>({
    state: "" as "New" | "Restored" | "",
    category: [],
    minPrice: null,
    maxPrice: null,
  });

  const saveFilters = () => {
    setSavedFilters({
      state,
      category,
      minPrice,
      maxPrice,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        state,
        category,
        minPrice,
        maxPrice,
        savedFilters,
        setState,
        setCategory,
        setMinPrice,
        setMaxPrice,
        saveFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
