// Show day number
export const getDayNumber = (date: Date): string => {
  return date.getDate().toString();
};

// Show month name
export const getMonthName = (date: Date): string => {
  return date.toLocaleString('default', { month: 'long' });
};

// Show year and month
export const getYearMonth = (date: Date): string => {
  return date.toLocaleString('default', { year: 'numeric', month: 'long' });
};

// Show formatted date as YYYY MMMM DD
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  return `${year} ${month} ${day}`;
};

// Convert date to ISO string format (YYYY-MM-DD) for Firestore consistency
export const dateToISOString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Normalize date to start of day (00:00:00) for comparison
export const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Compare two dates (ignoring time)
export const isSameDay = (date1: Date, date2: Date): boolean => {
  const norm1 = normalizeDate(date1);
  const norm2 = normalizeDate(date2);
  return norm1.getTime() === norm2.getTime();
};

export const daynames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const timestamps = [
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
];
