export default function formatDateToDDMMYY(date: Date | null): string | null {
  let currentDate = date;

  if (date === null) return "";
  if (typeof date === "string" && !isNaN(new Date(date).getTime())) {
    currentDate = new Date(date);
  }

  const day = currentDate!.getDate().toString().padStart(2, "0"); // Aseguramos que el día tenga dos dígitos
  const month = (currentDate!.getMonth() + 1).toString().padStart(2, "0"); // El mes se incrementa en 1 porque es 0-indexado
  const year = currentDate!.getFullYear().toString().slice(-2); // Obtenemos los últimos dos dígitos del año

  return `${day}/${month}/${year}`;
}
