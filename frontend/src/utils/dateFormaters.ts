export const formatDate = (date: string, options:Intl.DateTimeFormatOptions = {}) => {

  const settings: Intl.DateTimeFormatOptions = options || {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const dateStr = new Date(date).toLocaleDateString('ru-Ru', settings);
  return dateStr;
}
