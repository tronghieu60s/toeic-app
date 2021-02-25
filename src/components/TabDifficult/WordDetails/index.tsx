import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { TabPracticeParamList } from '~/types';
import StudyWord from '../../TabPractice/Study/StudyMode/StudyWord';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

const TabDifficultWordDetails = React.memo((props: Props) => {
  const { word } = props.route.params;

  return <StudyWord word={word} />;
});

export default TabDifficultWordDetails;
