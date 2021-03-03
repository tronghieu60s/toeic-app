/* eslint-disable import/prefer-default-export */
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export const countDateBetweenTwoDates = (firstDate: Date, secondDate: Date): number => {
  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
};
