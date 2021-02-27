/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import * as Speech from 'expo-speech';

export async function SpeechEnglish(value: string, option?: any): Promise<void> {
  Speech.stop();
  Speech.speak(value, { language: 'en', ...option });
}
