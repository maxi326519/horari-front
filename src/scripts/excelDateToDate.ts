export function excelDateToDate(excelDate: number) {
  // El número base de días en Excel comienza el 1 de enero de 1900, que es el día 1.
  const excelEpoch = new Date(1900, 0, 0);
  // Sumamos el número de días a esa fecha base
  const date = new Date(excelEpoch.getTime() + excelDate * 24 * 60 * 60 * 1000);

  // Formateamos la fecha a "dd/mm"
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${day}/${month}`;
}
