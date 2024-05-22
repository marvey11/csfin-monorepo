const formatDate = (locale: Intl.LocalesArgument, date: string | Date) =>
  new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);

export { formatDate };
