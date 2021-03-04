/* eslint-disable no-return-await */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INCREASE_POINT } from '../actions/practiceAction';
import {
  INCREASE_EXPERIENCE,
  INCREASE_STREAK,
  LOAD_STATISTICS,
  SET_POINT,
  SET_TARGET,
  StatisticsAction,
  StatisticsState,
} from '../actions/statisticsAction';

const statisticsDefaultState = {
  point: 0,
  streak: 0,
  experience: 0,
  target: 30,
};
const statisticsInitialState: StatisticsState = { ...statisticsDefaultState };

const statistics = (state = statisticsInitialState, action: StatisticsAction): StatisticsState => {
  switch (action.type) {
    case LOAD_STATISTICS: {
      const { streak, experience, target } = action.state || statisticsDefaultState;
      return { ...state, streak, experience, target };
    }
    case INCREASE_STREAK: {
      const newStreak = state.streak + 1;
      (async () => await AsyncStorage.setItem('@streak', newStreak.toString()))();
      return { ...state, streak: newStreak };
    }
    case INCREASE_EXPERIENCE: {
      const newExp = state.experience + (action.value || 0);
      (async () => await AsyncStorage.setItem('@experience', newExp.toString()))();
      return { ...state, experience: newExp };
    }
    case SET_TARGET: {
      const target = action.value || 30;
      (async () => await AsyncStorage.setItem('@target', target.toString()))();
      return { ...state, target };
    }
    case INCREASE_POINT: {
      const { point } = action;
      const newPoint = state.point + (point || 0);

      const { experience } = state;
      const newExperience = experience + newPoint;

      (async () => {
        await AsyncStorage.setItem('@experience', newExperience.toString());
      })();

      return { ...state, point: newPoint, experience: newExperience };
    }
    case SET_POINT: {
      const { point } = action;
      return { ...state, point: point || 0 };
    }
    default:
      return state;
  }
};
export default statistics;
