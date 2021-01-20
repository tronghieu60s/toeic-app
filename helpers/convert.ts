export function removeVietnameseTones(str: string) {
  const newStr = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
  return newStr;
}
