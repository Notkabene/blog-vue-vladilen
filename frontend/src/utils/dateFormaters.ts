export const formatDate = (date: string) => {
  const dateStr = new Date(date).toLocaleDateString('ru-Ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return dateStr;
}
