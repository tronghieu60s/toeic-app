export const SET_THEME = 'SET_THEME';
export const TOGGLE_THEME = 'TOGGLE_THEME';

export type ThemeType = 'light' | 'dark';

export type CommonAction = {
  type: string;
  theme?: ThemeType;
};

export const setTheme = (theme: ThemeType): CommonAction => ({
  type: SET_THEME,
  theme,
});

export const toggleTheme = (): CommonAction => ({
  type: TOGGLE_THEME,
});
