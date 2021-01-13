import { RouteProp } from '@react-navigation/native';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import CenterUI from '~/components/UI/Center';
import { TabPracticeParamList, WordType, StatusQuestion } from '~/types';
import AssembleWords from './StudyMode/AssembleWords';
import StudyUI from './StudyUI';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeStudy'>;
};

const TabPracticeStudy = memo(({ route }: Props) => {
  const { key } = route.params.group;
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [words, setWords] = useState<WordType[]>([]);
  const [indexStudy, setIndexStudy] = useState(0);

  useEffect(() => {
    const allWords: WordType[] = require('~/resource/words');
    const words: WordType[] = _.filter(allWords, (o) => o.group === key);
    setWords(_.shuffle(words));
  }, []);

  const handleAnswer = (value: string) => {
    const result = words[indexStudy].name.toLowerCase();
    const answer = value.trim().toLowerCase();
    if (result === answer) setStatus('Correct');
  };

  const handleClickAnswer = () => {
    if (status === 'Waiting') {
      const result = words[indexStudy].name.toLowerCase();
      const answer = 'aaa'.trim().toLowerCase();
      if (result === answer) setStatus('Correct');
      else setStatus('Incorrect');
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
      <AssembleWords words={words[indexStudy]} handleAnswer={handleAnswer} />
    </StudyUI>
  );
});

export default TabPracticeStudy;
