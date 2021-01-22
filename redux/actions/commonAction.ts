export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_MEAN = 'TOGGLE_MEAN';
export const TOGGLE_EXPLAIN = 'TOGGLE_EXPLAIN';
export const TOGGLE_PRONOUNCE = 'TOGGLE_PRONOUNCE';

export type ThemeType = 'light' | 'dark';

export type CommonAction = {
  type: string;
};

export const toggleTheme = (): CommonAction => ({
  type: TOGGLE_THEME,
});

export const toggleMean = (): CommonAction => ({
  type: TOGGLE_MEAN,
});

export const toggleExplain = (): CommonAction => ({
  type: TOGGLE_EXPLAIN,
});

export const togglePronounce = (): CommonAction => ({
  type: TOGGLE_PRONOUNCE,
});
