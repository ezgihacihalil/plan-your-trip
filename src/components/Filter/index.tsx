import { ChangeEvent, useState } from "react";
import css from "./style.module.css";

interface FilterProps {
  options: string[];
  label: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Filter: React.FC<FilterProps> = ({
  options,
  label,
  onChange,
  disabled,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={css.filter}>
      <label className={`${css.label} ${disabled ? css.disabled : ""}`}>
        {label}
        <select
          className={css.selectBox}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="">Choose the {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filter;
