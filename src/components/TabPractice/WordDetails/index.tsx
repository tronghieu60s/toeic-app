import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { TabPracticeParamList } from '~/types';
import StudyWord from '../Study/StudyMode/StudyWord';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabPracticeWordDetails = React.memo((props: Props) => {
  const { word } = props.route.params;

  return <StudyWord word={word} />;
});

export default TabPracticeWordDetails;
