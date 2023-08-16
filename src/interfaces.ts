import { Dispatch, SetStateAction } from "react";

export interface Products {
  name: string;
  id: string;
  price: number;
  state: "New" | "Restored";
  image: string[];
  description: string;
  availability: number;
  corp: string;
  date: string;
  quantity: number;
}

export type SetterFunction<T> = Dispatch<SetStateAction<T>>;
