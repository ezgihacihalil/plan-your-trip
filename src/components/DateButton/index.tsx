import React from "react";
import css from "./style.module.css";

const DateButton: React.FC<{
  formatted: string;
  selectedDate: string;
  original: string;
  handleDateClick: () => void;
  shouldDisableDate: boolean;
}> = React.memo(
  ({
    formatted,
    selectedDate,
    original,
    handleDateClick,
    shouldDisableDate,
  }) => {
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
          className={`${css.dateButton} ${
            original === selectedDate ? css.selected : ""
          }`}
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
