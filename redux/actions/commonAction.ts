export const SET_THEME = 'SET_THEME';

export type ThemeType = 'light' | 'dark';

export type CommonAction = {
  type: string;
  theme?: ThemeType;
};

export const setTheme = (theme: ThemeType): CommonAction => ({
  type: SET_THEME,
  theme,
});
