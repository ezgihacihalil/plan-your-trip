import React, { useState } from "react";
import css from "./style.module.css";
import useFetch from "../../hooks/useFetch";

interface DateSelectionProps {
  disabled: boolean;
  setDate: (date: string) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({ setDate, disabled }) => {
  const {
    data: dateResponse,
    loading: datesLoading,
    error: datesError,
  } = useFetch<string[]>("http://localhost:3001/available_dates");

  const [selectedDate, setSelectedDate] = useState("");

  const formattedDates = dateResponse?.map((date) => {
    const dateObj = new Date(date);
    const dayOfMonth = dateObj.toLocaleDateString(undefined, {
      day: "numeric",
    });
    const dayOfWeek = dateObj.toLocaleDateString(undefined, {
      weekday: "short",
    });

    return { formatted: `${dayOfWeek} ${dayOfMonth}`, original: date };
  });

  const handleDateClick = (date: string, originalDate: string) => {
    setSelectedDate(originalDate);
    setDate(originalDate);
  };

  const shouldDisableDate = !!datesError || datesLoading || disabled;

  return (
    <div className={css.dateSelection}>
      <label
        className={`${css.label} ${shouldDisableDate ? css.disabled : ""}`}
      >
        Date
      </label>
      <div className={css.dateButtons}>
        {formattedDates?.map(({ formatted, original }) => {
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
                key={original}
                className={`${css.dateButton} ${
                  original === selectedDate ? css.selected : ""
                }`}
                onClick={() => handleDateClick(formatted, original)}
                disabled={shouldDisableDate}
              >
                <span className={css.dayOfWeek}>{dayOfWeek}</span>
                <span className={css.dayOfMonth}>{dayOfMonth}</span>
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelection;
