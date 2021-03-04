const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export const countDateBetweenTwoDates = (firstDate: Date, secondDate: Date): number => {
  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
};

export const toShortMonthName = (month: number): string => {
  const monthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthName[month];
};
