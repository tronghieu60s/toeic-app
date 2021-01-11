export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_WORD = 'TOGGLE_WORD';
export const TOGGLE_MEAN = 'TOGGLE_MEAN';
export const TOGGLE_PRONOUNCE = 'TOGGLE_PRONOUNCE';

export type ThemeType = 'light' | 'dark';

export type CommonAction = {
  type: string;
};

export const toggleTheme = (): CommonAction => ({
  type: TOGGLE_THEME,
});

export const toggleWord = (): CommonAction => ({
  type: TOGGLE_WORD,
});

export const toggleMean = (): CommonAction => ({
  type: TOGGLE_MEAN,
});

export const togglePronounce = (): CommonAction => ({
  type: TOGGLE_PRONOUNCE,
});
