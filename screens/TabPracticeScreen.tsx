import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { TabPracticeParamList } from '~/types';
import { View } from '../components/Themed';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
}

export default function TabPracticeScreen({ navigation }: Props): JSX.Element {
  return <View />;
}
