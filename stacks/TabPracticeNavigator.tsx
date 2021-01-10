import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabPracticeScreen from '~/screens/TabPracticeScreen';
import { TabPracticeParamList } from '~/types';
import TabPracticeHeaderTitle from '~/components/TabPractice/Header/Title';
import TabPracticeWords from '~/components/TabPractice/Words';
import TabPracticeWordsHeaderTitle from '~/components/TabPractice/Words/Header/Title';
import TabPracticeWordsHeaderRight from '~/components/TabPractice/Words/Header/Right';

const TabPracticeStack = createStackNavigator<TabPracticeParamList>();

export default function TabPracticeNavigator(): JSX.Element {
  return (
    <TabPracticeStack.Navigator>
      <TabPracticeStack.Screen
        name="TabPracticeScreen"
        component={TabPracticeScreen}
        options={{ headerTitle: () => <TabPracticeHeaderTitle /> }}
      />
      <TabPracticeStack.Screen
        name="TabPracticeWords"
        component={TabPracticeWords}
        options={({ route }) => ({
          headerTitle: () => <TabPracticeWordsHeaderTitle route={route} />,
          headerRight: () => <TabPracticeWordsHeaderRight />,
        })}
      />
    </TabPracticeStack.Navigator>
  );
}
