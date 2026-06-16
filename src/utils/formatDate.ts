export function formatMonthYear(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatDateRange(startDate: string, endDate?: string | null) {
  const start = formatMonthYear(startDate);
  if (!endDate) return `${start} – Present`;
  
  const end = formatMonthYear(endDate);
  if (start === end) return start;
  
  return `${start} – ${end}`;
}
