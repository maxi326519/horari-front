export default function formatDateToRegister(date: Date | null): string | null {
  let currentDate = date;

  if (date === null) return "";
  if (typeof date === "string" && !isNaN(new Date(date).getTime())) {
    currentDate = new Date(date);
  }

  const day = currentDate!.getDate().toString().padStart(2, "0");
  const month = (currentDate!.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate!.getFullYear().toString().slice(-2);
  const hours = currentDate!.getHours().toString().padStart(2, "0");
  const minutes = currentDate!.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
