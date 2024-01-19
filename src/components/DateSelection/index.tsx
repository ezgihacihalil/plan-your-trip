import React, {useMemo } from "react";
import css from "./style.module.css";
import useFetch from "../../hooks/useFetch";
import { AVAILABLE_DATES } from "../Filter/constants";
import { DateSelectionProps, FormattedDateType } from "./types";
import { formatDate } from "./utils";
import DateButton from "../DateButton";

const DateSelection: React.FC<DateSelectionProps> = React.memo(
  ({ setDate, date, disabled }) => {
    const {
      data: dateResponse,
      loading: datesLoading,
      error: datesError,
    } = useFetch<string[]>(AVAILABLE_DATES);

    const formattedDates = useMemo(
      () =>
        dateResponse?.map((date) => {
          return formatDate(date);
        }),
      [dateResponse, formatDate]
    );

    const handleDateClick = (originalDate: string) => {
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
          {formattedDates?.map((item: FormattedDateType | null) => {
            if (item === null) {
              return null;
            }

            const { formatted, original } = item;
            return (
              <DateButton
                key={original}
                formatted={formatted}
                isSelected={original === date}
                handleDateClick={() => handleDateClick(original)}
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
