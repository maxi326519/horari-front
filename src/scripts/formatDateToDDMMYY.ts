export default function formatDateToDDMMYY(date: Date | null): string | null {
  if (date === null) {
    return null; // Si la fecha es null, devolvemos null
  }

  const day = date.getDate().toString().padStart(2, "0"); // Aseguramos que el día tenga dos dígitos
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // El mes se incrementa en 1 porque es 0-indexado
  const year = date.getFullYear().toString().slice(-2); // Obtenemos los últimos dos dígitos del año

  return `${day}/${month}/${year}`;
}
