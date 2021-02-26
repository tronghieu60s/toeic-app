export const generateRandomChars = (length: number): string => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const randomBetweenTwoNumber = (num1: number, num2: number): number => {
  return Math.floor(Math.random() * num2) + num1;
};
