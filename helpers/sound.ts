import { Audio } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV';

export const AUDIO_CORRECT = require('~/assets/sounds/audio_correct_answer.m4a');
export const AUDIO_WRONG = require('~/assets/sounds/audio_wrong_answer.m4a');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function playSound(source: AVPlaybackSource) {
  const { sound } = await Audio.Sound.createAsync(source);
  await sound.playAsync();
}
