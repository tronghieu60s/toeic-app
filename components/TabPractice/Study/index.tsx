import { RouteProp } from '@react-navigation/native';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, ToastAndroid, Vibration } from 'react-native';
import CenterUI from '~/components/UI/Center';
import playSound, { AUDIO_CORRECT, AUDIO_WRONG } from '~/helpers/sound';
import { StatusQuestion, TabPracticeParamList, WordType } from '~/types';
import AssembleWords from './StudyMode/AssembleWords';
import ChooseWord from './StudyMode/ChooseWord';
import StudyUI from './StudyUI';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeStudy'>;
};

const TabPracticeStudy = memo(({ route }: Props) => {
  const { key } = route.params.group;
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [words, setWords] = useState<WordType[]>([]);
  const [indexStudy, setIndexStudy] = useState(0);

  const handleCorrectAnswer = () => {
    Keyboard.dismiss();
    playSound(AUDIO_CORRECT);
    setStatus('Correct');
  };

  const handleWrongAnswer = () => {
    playSound(AUDIO_WRONG);
    Vibration.vibrate(200);
    setStatus('Incorrect');
  };

  useEffect(() => {
    const allWords: WordType[] = require('~/resource/words');
    const words: WordType[] = _.filter(allWords, (o) => o.group === key);
    setWords(_.shuffle(words));
  }, []);

  const handleAnswer = (value: string) => {
    const result = words[indexStudy].name.toLowerCase();
    const answer = value.trim().toLowerCase();
    if (result === answer) handleCorrectAnswer();
  };

  const handleClickAnswer = () => {
    if (status === 'Waiting') {
      const result = words[indexStudy].name.toLowerCase();
      const answer = 'aaa'.trim().toLowerCase();
      if (result === answer) handleCorrectAnswer();
      else handleWrongAnswer();
    } else {
      setIndexStudy(indexStudy + 1);
      setStatus('Waiting');
    }
  };

  if (words.length <= 0) {
    return (
      <CenterUI>
        <ActivityIndicator size="small" color="#0000ff" />
      </CenterUI>
    );
  }

  return (
    <StudyUI status={status} words={words[indexStudy]} handleClickAnswer={handleClickAnswer}>
      {/* <AssembleWords words={words[indexStudy]} handleAnswer={handleAnswer} /> */}
      <ChooseWord word={words[indexStudy]} handleAnswer={handleAnswer} />
    </StudyUI>
  );
});

export default TabPracticeStudy;
