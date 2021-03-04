import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'react';

export const LOAD_STATISTICS = 'LOAD_STATISTICS';
export const INCREASE_STREAK = 'INCREASE_STREAK';
export const INCREASE_EXPERIENCE = 'INCREASE_EXPERIENCE';
export const SET_TARGET = 'SET_TARGET';
export const SET_POINT = 'SET_POINT';
export const INCREASE_POINT = 'INCREASE_POINT';

export type StatisticsState = {
  point: number;
  streak: number;
  experience: number;
  target: number;
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

export const actLoadStatistics = () => async (
  dispatch: Dispatch<StatisticsAction>,
): Promise<void> => {
  const streak = await AsyncStorage.getItem('@streak') || '0';
  const experience = await AsyncStorage.getItem('@experience') || '0';
  const target = await AsyncStorage.getItem('@target') || '30';

  const state: StatisticsState = {
    point: 0,
    streak: parseInt(streak, 10),
    experience: parseInt(experience, 10),
    target: parseInt(target, 10),
  };
  return dispatch(loadStatistics(state));
};

export const setPoint = (value: number): StatisticsAction => ({
  type: SET_POINT,
  value,
});

export const increasePoint = (value: number): StatisticsAction => ({
  type: INCREASE_POINT,
  value,
});

export const increaseStreak = (): StatisticsAction => ({
  type: INCREASE_STREAK,
});

export const increaseExperience = (value: number): StatisticsAction => ({
  type: INCREASE_EXPERIENCE,
  value,
});

export const setTarget = (value: number): StatisticsAction => ({
  type: SET_TARGET,
  value,
});
