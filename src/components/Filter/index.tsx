import { ChangeEvent, useState } from "react";
import css from "./style.module.css";
import { FilterProps } from "./types";

function Filter({ options, label, onChange, disabled, isCity }: FilterProps) {
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
            <option
              key={(isCity ? option[0] : option).toString()}
              value={isCity ? option[0].toString() : option.toString()}
            >
              {isCity ? option[1] : option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Filter;
