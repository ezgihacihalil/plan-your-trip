import { City } from "../Container/types";

export type FilterProps = {
  options: string[] | City[] | [];
  label: string;
  onChange: (value: string) => void;
  disabled: boolean;
  isCity?: boolean;
};
