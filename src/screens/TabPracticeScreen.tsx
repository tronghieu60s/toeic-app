import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import TabPractice from '~/src/components/TabPractice';
import { TabPracticeParamList } from '~/types';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default function TabPracticeScreen({ navigation }: Props): JSX.Element {
  return <TabPractice navigation={navigation} />;
}
