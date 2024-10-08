/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
export function shuffle(a: any[]): any[] {
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
