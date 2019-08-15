export const daysFromNow = (d: Date, days: number): Date => {
  const date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
};

export const daysFromNowISO = (date: Date, days: number): string => {
  return daysFromNow(date, days).toISOString().substr(0, 10); // 'YYYY-MM-DD'
};
