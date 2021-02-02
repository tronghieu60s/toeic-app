import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'react';

export const LOAD_COMMON = 'LOAD_COMMON';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_MEAN = 'TOGGLE_MEAN';
export const TOGGLE_EXPLAIN = 'TOGGLE_EXPLAIN';
export const TOGGLE_PRONOUNCE = 'TOGGLE_PRONOUNCE';

export type ThemeType = 'light' | 'dark';

export type CommonState = {
  theme: ThemeType;
  visibleMean: boolean;
  visibleExplain: boolean;
  visiblePronounce: boolean;
};

export type CommonAction = {
  type: string;
  state?: CommonState;
};

export const loadCommon = (state: CommonState): CommonAction => ({
  type: LOAD_COMMON,
  state,
});

export const actLoadCommon = () => async (dispatch: Dispatch<CommonAction>): Promise<void> => {
  const theme = (await AsyncStorage.getItem('theme_storage')) === 'light' ? 'light' : 'dark';
  const visibleMean = (await AsyncStorage.getItem('visibleMean_storage')) === 'true';
  const visibleExplain = (await AsyncStorage.getItem('visibleExplain_storage')) === 'true';
  const visiblePronounce = (await AsyncStorage.getItem('visiblePronounce_storage')) === 'true';
  const state: CommonState = { theme, visibleMean, visibleExplain, visiblePronounce };
  return dispatch(loadCommon(state));
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
