import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'react';

export const LOAD_STATISTICS = 'LOAD_STATISTICS';

export const RESET_STREAK = 'RESET_STREAK';
export const INCREASE_STREAK = 'INCREASE_STREAK';
export const INCREASE_EXPERIENCE = 'INCREASE_EXPERIENCE';

export const SET_POINT = 'SET_POINT';
export const INCREASE_POINT = 'INCREASE_POINT';

export type StatisticsState = {
  point: number;
  streak: number;
  experience: number;
};

export type StatisticsAction = {
  type: string;
  point?: number;
  state?: StatisticsState;
  value?: number;
};

export const loadStatistics = (state: StatisticsState): StatisticsAction => ({
  type: LOAD_STATISTICS,
  state,
});

export const increaseStreak = (): StatisticsAction => ({
  type: INCREASE_STREAK,
});

export const resetStreak = (): StatisticsAction => ({
  type: RESET_STREAK,
});

export const increaseExperience = (value: number): StatisticsAction => ({
  type: INCREASE_EXPERIENCE,
  value,
});

export const setPoint = (value: number): StatisticsAction => ({
  type: SET_POINT,
  value,
});

export const increasePoint = (value: number): StatisticsAction => ({
  type: INCREASE_POINT,
  value,
});

// Redux Thunk
export const actLoadStatistics = () => async (
  dispatch: Dispatch<StatisticsAction>,
): Promise<void> => {
  const streak = (await AsyncStorage.getItem('@streak')) || '0';
  const experience = (await AsyncStorage.getItem('@experience')) || '0';

  const state: StatisticsState = {
    point: 0,
    streak: parseInt(streak, 10),
    experience: parseInt(experience, 10),
  };
  return dispatch(loadStatistics(state));
};

export const actIncreasePoint = (value: number) => async (
  dispatch: Dispatch<StatisticsAction>,
): Promise<void> => {
  dispatch(increaseExperience(value));
  return dispatch(increasePoint(value));
};

export const actIncreaseStreak = () => async (
  dispatch: Dispatch<StatisticsAction>,
): Promise<void> => {
  const preDateStorage = (await AsyncStorage.getItem('@previous_date')) || '0';
  const numDatePreStorage = parseInt(preDateStorage, 10);
  const now = new Date();
  const firstDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (firstDate.getTime() - numDatePreStorage === 86400000 || numDatePreStorage === 0) {
    await AsyncStorage.setItem('@previous_date', firstDate.getTime().toString());
    dispatch(increaseStreak());
  }
  return undefined;
};

export const actResetStreak = () => async (dispatch: Dispatch<StatisticsAction>): Promise<void> => {
  const preDateStorage = (await AsyncStorage.getItem('@previous_date')) || '0';
  const numDatePreStorage = parseInt(preDateStorage, 10);
  const now = new Date();
  const firstDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (firstDate.getTime() - numDatePreStorage >= 86400000 * 2) {
    await AsyncStorage.setItem('@previous_date', '0');
    dispatch(resetStreak());
  }
  return undefined;
};
