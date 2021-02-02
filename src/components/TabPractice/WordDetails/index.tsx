import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { TabPracticeParamList } from '~/types';
import StudyWord from '../Study/StudyMode/StudyWord';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetails = memo((props: Props) => {
  const { word } = props.route.params;

  return <StudyWord word={word} />;
});

export default TabPracticeWordDetails;
