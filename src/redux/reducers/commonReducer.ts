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
  SET_VOICE_IDENTIFY,
  SET_VOICE_RATE,
  SET_VOICE_PITCH,
} from '../actions/commonAction';

const initState: CommonState = {
  theme: 'light',
  visibleMean: true,
  visibleExplain: true,
  visiblePronounce: true,
  voiceIdentify: 'en-US-language',
  voiceRate: 1,
  voicePitch: 1,
};

const commonInitialState: CommonState = {
  ...initState,
};

const common = (state = commonInitialState, action: CommonAction): CommonState => {
  switch (action.type) {
    case LOAD_COMMON: {
      if (action.state) return { ...action.state };
      return { ...commonInitialState };
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
    case SET_VOICE_IDENTIFY: {
      const voiceIdentify = action.voice || 'en-US-language';
      (async () => await AsyncStorage.setItem('voiceIdentify_storage', `${voiceIdentify}`))();
      return { ...state, voiceIdentify };
    }
    case SET_VOICE_RATE: {
      const voiceRate = action.rate || 1;
      (async () => await AsyncStorage.setItem('voiceRate_storage', `${voiceRate}`))();
      return { ...state, voiceRate };
    }
    case SET_VOICE_PITCH: {
      const voicePitch = action.pitch || 1;
      (async () => await AsyncStorage.setItem('voicePitch_storage', `${voicePitch}`))();
      return { ...state, voicePitch };
    }
    default:
      return state;
  }
};

export default common;
