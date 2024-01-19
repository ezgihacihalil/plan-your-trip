import React, { useState, useMemo } from "react";
import css from "./style.module.css";
import useFetch from "../../hooks/useFetch";
import { AVAILABLE_DATES } from "../Filter/constants";
import { DateSelectionProps, FormattedDateType } from "./types";
import { formatDate } from "./utils";
import DateButton from "../DateButton";

const DateSelection: React.FC<DateSelectionProps> = React.memo(
  ({ setDate, disabled }) => {
    const {
      data: dateResponse,
      loading: datesLoading,
      error: datesError,
    } = useFetch<string[]>(AVAILABLE_DATES);

    const [selectedDate, setSelectedDate] = useState("");

    const formattedDates = useMemo(
      () =>
        dateResponse?.map((date) => {
          return formatDate(date);
        }),
      [dateResponse, formatDate]
    );

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
          {formattedDates?.map((date: FormattedDateType | null) => {
            if (date === null) {
              return null;
            }

            const { formatted, original } = date;
            return (
              <DateButton
                key={original}
                formatted={formatted}
                original={original}
                selectedDate={selectedDate}
                handleDateClick={() => handleDateClick(formatted, original)}
                shouldDisableDate={shouldDisableDate}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

export default DateSelection;
