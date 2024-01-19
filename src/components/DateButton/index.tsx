import React from "react";
import css from "./style.module.css";

const DateButton: React.FC<{
  formatted: string;
  isSelected: boolean;
  handleDateClick: () => void;
  shouldDisableDate: boolean;
}> = React.memo(
  ({ formatted, isSelected, handleDateClick, shouldDisableDate }) => {
    const [dayOfWeek, dayOfMonth] = formatted.split(" ");
    const isNewMonth = dayOfMonth === "1";

    return (
      <>
        {isNewMonth && (
          <div className={css.monthDividerContainer}>
            <div
              className={`${css.monthDivider} ${
                shouldDisableDate ? css.disabledMonthDivider : ""
              }`}
            />
          </div>
        )}
        <button
          key={formatted}
          className={`${css.dateButton} ${isSelected ? css.selected : ""}`}
          onClick={handleDateClick}
          disabled={shouldDisableDate}
        >
          <span className={css.dayOfWeek}>{dayOfWeek}</span>
          <span className={css.dayOfMonth}>{dayOfMonth}</span>
        </button>
      </>
    );
  }
);

export default DateButton;
