import { FormattedDateType } from "./types";

export function formatDate(date: string): FormattedDateType | null {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return null;
  }

  const dayOfMonth = dateObj.toLocaleDateString(undefined, { day: "numeric" });
  const dayOfWeek = dateObj.toLocaleDateString(undefined, { weekday: "short" });

  return { formatted: `${dayOfWeek} ${dayOfMonth}`, original: date };
}
