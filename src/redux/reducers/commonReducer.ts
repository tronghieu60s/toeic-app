/* eslint-disable no-return-await */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommonState,
  CommonAction,
  ThemeType,
  LOAD_COMMON,
  TOGGLE_EXPLAIN,
  TOGGLE_MEAN,
  TOGGLE_PRONOUNCE,
  TOGGLE_THEME,
} from '../actions/commonAction';

const commonInitialState: CommonState = {
  theme: 'light',
  visibleMean: true,
  visibleExplain: true,
  visiblePronounce: true,
};

const common = (state = commonInitialState, action: CommonAction): CommonState => {
  switch (action.type) {
    case LOAD_COMMON: {
      if (action.state) return { ...action.state };
      return {
        theme: 'light',
        visibleMean: true,
        visibleExplain: true,
        visiblePronounce: true,
      };
    }
    case TOGGLE_THEME: {
      const theme: ThemeType = state.theme === 'light' ? 'dark' : 'light';
      (async () => await AsyncStorage.setItem('theme_storage', theme))();
      return { ...state, theme };
    }
    case TOGGLE_MEAN: {
      const visibleMean = !state.visibleMean;
      (async () => await AsyncStorage.setItem('visibleMean_storage', `${visibleMean}`))();
      return { ...state, visibleMean };
    }
    case TOGGLE_EXPLAIN: {
      const visibleExplain = !state.visibleExplain;
      (async () => await AsyncStorage.setItem('visibleExplain_storage', `${visibleExplain}`))();
      return { ...state, visibleExplain };
    }
    case TOGGLE_PRONOUNCE: {
      const visiblePronounce = !state.visiblePronounce;
      (async () => await AsyncStorage.setItem('visiblePronounce_storage', `${visiblePronounce}`))();
      return { ...state, visiblePronounce };
    }
    default:
      return state;
  }
};

export default common;
