export default function formatDateToHHMM(date: Date | null): string | null {
  let currentDate = date;

  if (date === null) return "";
  if (typeof date === "string" && !isNaN(new Date(date).getTime())) {
    currentDate = new Date(date);
  }

  const hours = currentDate!.getHours().toString().padStart(2, "0");
  const minutes = currentDate!.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
