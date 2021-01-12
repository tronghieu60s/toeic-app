import React from 'react';
import { CardStyleInterpolators, createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import TabPracticeScreen from '~/screens/TabPracticeScreen';
import { TabPracticeParamList } from '~/types';
import TabPracticeHeaderTitle from '~/components/TabPractice/Header/Title';
import TabPracticeWords from '~/components/TabPractice/Words';
import TabPracticeWordsHeaderTitle from '~/components/TabPractice/Words/Header/Title';
import TabPracticeWordsHeaderRight from '~/components/TabPractice/Words/Header/Right';
import TabPracticeWordDetailHeaderTitle from '~/components/TabPractice/WordDetails/Header/Title';
import TabPracticeWordDetails from '~/components/TabPractice/WordDetails';

const TabPracticeStack = createStackNavigator<TabPracticeParamList>();

export default function TabPracticeNavigator(): JSX.Element {
  return (
    <TabPracticeStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    >
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
      <TabPracticeStack.Screen
        name="TabPracticeWordDetails"
        component={TabPracticeWordDetails}
        options={({ route }) => ({
          headerTitle: () => <TabPracticeWordDetailHeaderTitle route={route} />,
        })}
      />
    </TabPracticeStack.Navigator>
  );
}
