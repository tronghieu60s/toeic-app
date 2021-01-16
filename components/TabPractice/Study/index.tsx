import React, { memo, useState } from 'react';
import { ActivityIndicator, Keyboard, Vibration } from 'react-native';
import { useSelector } from 'react-redux';
import { View } from '~/components/Themed';
import CenterUI from '~/components/UI/Center';
import ProcessBar from '~/components/UI/ProcessBar';
import { randomBetweenTwoNumber } from '~/helpers/random';
import playSound, { AUDIO_CORRECT, AUDIO_WRONG } from '~/helpers/sound';
import { RootState } from '~/redux/reducers/rootReducer';
import { StatusQuestion } from '~/types';
import AlertUI from './AlertUI';
import BottomUI from './BottomUI';
import AssembleWords from './StudyMode/AssembleWords';
import ChooseWord from './StudyMode/ChooseWord';
import StudyUI from './StudyUI';

const TabPracticeStudy = memo(() => {
  const [status, setStatus] = useState<StatusQuestion>('Correct');

  const words = useSelector((state: RootState) => state.practice.practiceWords);
  const [index, setIndex] = useState(() => randomBetweenTwoNumber(0, words.length));
  const [answer, setAnswer] = useState('');

  const handleSendAnswer = (value: string) => {
    const answer = value.trim().toLowerCase();
    setAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (status !== 'Waiting') {
      const random = randomBetweenTwoNumber(0, words.length);
      setIndex(random);
      setStatus('Waiting');
      return;
    }

    const result = words[index].name.trim().toLowerCase();
    if (result === answer) {
      playSound(AUDIO_CORRECT);
      setStatus('Correct');
    } else {
      playSound(AUDIO_WRONG);
      Vibration.vibrate(200);
      setStatus('Incorrect');
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
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <ProcessBar percent={90} />
      <StudyUI words={words[index]}>
        <AssembleWords words={words[index]} handleSendAnswer={handleSendAnswer} />
        {/* <ChooseWord word={words[index]} handleSendAnswer={handleSendAnswer} /> */}
      </StudyUI>
      <BottomUI status={status} handleCheckAnswer={handleCheckAnswer} />
      {status !== 'Waiting' && <AlertUI status={status} />}
    </View>
  );
});

export default TabPracticeStudy;
