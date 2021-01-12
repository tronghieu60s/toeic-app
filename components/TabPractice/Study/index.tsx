import { RouteProp } from '@react-navigation/native';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import CenterUI from '~/components/UI/Center';
import { TabPracticeParamList, WordType } from '~/types';
import AssembleWords from './StudyMode/AssembleWords';
import StudyUI from './StudyUI';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeStudy'>;
};

const TabPracticeStudy = memo(({ route }: Props) => {
  const { key } = route.params.group;
  const [indexStudy, setIndexStudy] = useState(0);
  const [words, setWords] = useState<WordType[]>([]);

  useEffect(() => {
    const allWords: WordType[] = require('~/resource/words');
    const words: WordType[] = _.filter(allWords, (o) => o.group === key);
    setWords(_.shuffle(words));
  }, []);

  if (words.length <= 0) {
    return (
      <CenterUI>
        <ActivityIndicator size="small" color="#0000ff" />
      </CenterUI>
    );
  }

  return (
    <StudyUI words={words[indexStudy]}>
      <AssembleWords words={words[indexStudy]} />
    </StudyUI>
  );
});

export default TabPracticeStudy;
