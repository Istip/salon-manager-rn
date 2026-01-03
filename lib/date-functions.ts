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

export const daynames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const timestamps = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
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
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];
