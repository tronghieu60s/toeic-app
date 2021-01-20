import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { AVPlaybackSource } from 'expo-av/build/AV';

export const AUDIO_CORRECT = require('~/assets/sounds/audio_correct_answer.m4a');
export const AUDIO_WRONG = require('~/assets/sounds/audio_wrong_answer.m4a');
export const AUDIO_FINISH = require('~/assets/sounds/audio_session_end.m4a');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function playSound(source: AVPlaybackSource) {
  const { sound } = await Audio.Sound.createAsync(source);
  await sound.playAsync();
}

export async function SpeechEnglish(value: string, option?: any) {
  Speech.speak(value, { language: 'en', ...option });
}
