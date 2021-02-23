/* eslint-disable consistent-return */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'react';

export const LOAD_COMMON = 'LOAD_COMMON';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const TOGGLE_MEAN = 'TOGGLE_MEAN';
export const TOGGLE_EXPLAIN = 'TOGGLE_EXPLAIN';
export const TOGGLE_PRONOUNCE = 'TOGGLE_PRONOUNCE';
export const SET_VOICE_IDENTIFY = 'SET_VOICE_IDENTIFY';
export const SET_VOICE_RATE = 'SET_VOICE_RATE';
export const SET_VOICE_PITCH = 'SET_VOICE_PITCH';

export type ThemeType = 'light' | 'dark';

export type CommonState = {
  theme: ThemeType;
  visibleMean: boolean;
  visibleExplain: boolean;
  visiblePronounce: boolean;
  voiceIdentify: string;
  voiceRate: number;
  voicePitch: number;
};

export type CommonAction = {
  type: string;
  state?: CommonState;
  voice?: string;
  rate?: number;
  pitch?: number;
};

export const loadCommon = (state: CommonState): CommonAction => ({
  type: LOAD_COMMON,
  state,
});

export const actLoadCommon = () => async (dispatch: Dispatch<CommonAction>): Promise<void> => {
  const theme_storage = await AsyncStorage.getItem('theme_storage');
  const visibleMean_storage = await AsyncStorage.getItem('visibleMean_storage');
  const visibleExplain_storage = await AsyncStorage.getItem('visibleExplain_storage');
  const visiblePronounce_storage = await AsyncStorage.getItem('visiblePronounce_storage');
  const voiceIdentify_storage = await AsyncStorage.getItem('voiceIdentify_storage');
  const voiceRate_storage = await AsyncStorage.getItem('voiceRate_storage');
  const voicePitch_storage = await AsyncStorage.getItem('voicePitch_storage');

  const themeStorage = theme_storage === 'light' ? 'light' : 'dark';
  const theme = theme_storage !== null ? themeStorage : 'light';

  // Visible
  const visibleMean = visibleMean_storage !== null ? visibleMean_storage === 'true' : true;
  const visibleExplain = visibleExplain_storage !== null ? visibleExplain_storage === 'true' : true;
  const visiblePronounce =
    visiblePronounce_storage !== null ? visiblePronounce_storage === 'true' : true;

  // Voice
  const voiceIdentify = voiceIdentify_storage !== null ? voiceIdentify_storage : 'en-US-language';
  const voiceRate = voiceRate_storage !== null ? parseFloat(voiceRate_storage) : 1;
  const voicePitch = voicePitch_storage !== null ? parseFloat(voicePitch_storage) : 1;

  const state: CommonState = {
    theme,
    visibleMean,
    visibleExplain,
    visiblePronounce,
    voiceIdentify,
    voiceRate,
    voicePitch,
  };
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

export const setVoiceIdentify = (voice: string): CommonAction => ({
  type: SET_VOICE_IDENTIFY,
  voice,
});

export const setVoiceRate = (rate: number): CommonAction => ({
  type: SET_VOICE_RATE,
  rate,
});

export const setVoicePitch = (pitch: number): CommonAction => ({
  type: SET_VOICE_PITCH,
  pitch,
});
