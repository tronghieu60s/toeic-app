import { Audio } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV';
import * as Speech from 'expo-speech';

export const AUDIO_CORRECT = require('~/assets/sounds/audio_correct_answer.m4a');
export const AUDIO_CORRECT_FULL = require('~/assets/sounds/audio_fully_grown.m4a');
export const AUDIO_WRONG = require('~/assets/sounds/audio_wrong_answer.m4a');
export const AUDIO_FINISH = require('~/assets/sounds/audio_session_end.m4a');

export async function playSound(source: AVPlaybackSource) {
  const { sound } = await Audio.Sound.createAsync(source);
  await sound.playAsync();
}

export async function SpeechEnglish(value: string, option?: any) {
  Speech.stop();
  Speech.speak(value, { language: 'en', voice: 'en-au-x-aud-local', ...option });

  // console.log('--- List Voice ---');
  // let list = await Speech.getAvailableVoicesAsync();
  // list = list.filter((o) => o.identifier.slice(0, 2) === 'en');
  // list.map((o) => console.log(`${o.identifier} - ${o.language}`));
}
