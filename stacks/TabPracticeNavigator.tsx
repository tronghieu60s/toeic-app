import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabPracticeScreen from '~/screens/TabPracticeScreen';
import { TabPracticeParamList } from '~/types';
import TabPracticeHeaderTitle from '~/components/TabPractice/TabPracticeHeaderTitle';

const TabPracticeStack = createStackNavigator<TabPracticeParamList>();

export default function TabPracticeNavigator(): JSX.Element {
  return (
    <TabPracticeStack.Navigator>
      <TabPracticeStack.Screen
        name="TabPracticeScreen"
        component={TabPracticeScreen}
        options={{ headerTitle: () => <TabPracticeHeaderTitle /> }}
      />
    </TabPracticeStack.Navigator>
  );
}
