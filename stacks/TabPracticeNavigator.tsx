import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';
import TabPracticeScreen from '~/screens/TabPracticeScreen';
import { TabPracticeParamList } from '~/types';
import TabPracticeHeaderTitle from '~/components/TabPractice/Header/Title';
import TabPracticeWords from '~/components/TabPractice/Words';
import TabPracticeWordsHeaderTitle from '~/components/TabPractice/Words/Header/Title';
import TabPracticeWordsHeaderRight from '~/components/TabPractice/Words/Header/Right';
import TabPracticeWordDetailHeaderTitle from '~/components/TabPractice/WordDetails/Header/Title';
import TabPracticeWordDetails from '~/components/TabPractice/WordDetails';
import TabPracticeStudy from '~/components/TabPractice/Study';
import TabPracticeStudyHeaderRight from '~/components/TabPractice/Study/Header/Right';
import { View } from '~/components/Themed';

const TabPracticeStack = createStackNavigator<TabPracticeParamList>();

export default function TabPracticeNavigator(): JSX.Element {
  return (
    <TabPracticeStack.Navigator
      screenOptions={{
        transitionSpec: {
          open: TransitionSpecs.FadeInFromBottomAndroidSpec,
          close: TransitionSpecs.FadeInFromBottomAndroidSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
        options={({ route, navigation }) => ({
          headerTitle: () => <TabPracticeWordsHeaderTitle route={route} />,
          headerRight: () => <TabPracticeWordsHeaderRight navigation={navigation} />,
        })}
      />
      <TabPracticeStack.Screen
        name="TabPracticeWordDetails"
        component={TabPracticeWordDetails}
        options={({ route }) => ({
          headerTitle: () => <TabPracticeWordDetailHeaderTitle route={route} />,
        })}
      />
      <TabPracticeStack.Screen
        name="TabPracticeStudy"
        component={TabPracticeStudy}
        options={({ route }) => ({
          headerTitle: () => <View />,
          headerRight: () => <TabPracticeStudyHeaderRight />,
        })}
      />
    </TabPracticeStack.Navigator>
  );
}
