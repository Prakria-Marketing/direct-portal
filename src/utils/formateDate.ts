export function formatDate(isoDateStr: string) {
  try {
    const date = new Date(isoDateStr);

    // Use Intl.DateTimeFormat to format the date
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formatter.format(date);
  } catch (err: any) {
    return "";
  }
}
