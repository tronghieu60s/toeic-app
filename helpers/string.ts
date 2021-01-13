export const spliceString = (str: string, index: number, count: number): string => {
  var ar = str.split('');
  ar.splice(index, count);
  return ar.join('');
};
