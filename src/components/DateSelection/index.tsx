// DateSelection.tsx

import React from "react";
import css from "./style.module.css";

interface DateSelectionProps {
  disabled: boolean;
}

const DateSelection: React.FC<DateSelectionProps> = ({ disabled }) => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const dayOfMonth = date.toLocaleDateString(undefined, { day: "numeric" });
    const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "short" });

    return `${dayOfWeek} ${dayOfMonth}`;
  });

  return (
    <div className={css.dateSelection}>
      <label className={css.label}>Date</label>
      <div className={css.dateButtons}>
        {dates.map((date) => {
          const [dayOfWeek, dayOfMonth] = date.split(" ");

          return (
            <button key={date} className={css.dateButton} disabled={disabled}>
              <span className={css.dayOfWeek}>{dayOfWeek}</span>
              <span className={css.dayOfMonth}>{dayOfMonth}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelection;
