export default function formatCurrency(number: number): string {
  return `$${Number(number).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}