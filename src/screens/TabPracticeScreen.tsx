import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import TabPractice from '~/src/components/TabPractice';
import { TabPracticeParamList } from '~/types';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default function TabPracticeScreen(props: Props): JSX.Element {
  const { navigation } = props;
  return <TabPractice navigation={navigation} />;
}
