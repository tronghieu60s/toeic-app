const tintColorLight = '#5e72e4';
const defaultColorLight = '#172b4d';
const secondaryColorLight = '#f4f5f7';
const successColorLight = '#2dce89';
const dangerColorLight = '#f5365c';
const warningColorLight = '#fb6340';

const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    default: defaultColorLight,
    secondary: secondaryColorLight,
    success: successColorLight,
    danger: dangerColorLight,
    warning: warningColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
