export default function dateToStringInput(date: Date | null): string {
  if (date && !isNaN(date.getTime())) {
    return date ? date.toISOString().split("T")[0] : "";
  } else {
    return "";
  }
}
