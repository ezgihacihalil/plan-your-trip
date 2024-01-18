import { ChangeEvent, useState } from "react";
import css from "./style.module.css";

interface FilterProps {
  options: Location[] | string[];
  label: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isCity?: boolean;
}

function Filter({ options, label, onChange, disabled, isCity }: FilterProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  console.log(options);

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
            <option
              // @ts-ignore
              key={isCity ? option[0] : option}
              // @ts-ignore
              value={isCity ? option[0] : option}
            >
              {
                // @ts-ignore
                isCity ? option[1] : option
              }
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Filter;
