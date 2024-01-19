export function formatDate(date: string): {
  formatted: string;
  original: string;
} {
  const dateObj = new Date(date);
  const dayOfMonth = dateObj.toLocaleDateString(undefined, { day: "numeric" });
  const dayOfWeek = dateObj.toLocaleDateString(undefined, { weekday: "short" });

  return { formatted: `${dayOfWeek} ${dayOfMonth}`, original: date };
}
