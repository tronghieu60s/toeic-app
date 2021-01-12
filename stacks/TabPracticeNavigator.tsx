import { FontAwesome5 } from '@expo/vector-icons';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';
import React from 'react';
import TabPracticeHeaderTitle from '~/components/TabPractice/Header/Title';
import TabPracticeStudy from '~/components/TabPractice/Study';
import TabPracticeStudyHeaderRight from '~/components/TabPractice/Study/Header/Right';
import TabPracticeWordDetails from '~/components/TabPractice/WordDetails';
import TabPracticeWordDetailHeaderTitle from '~/components/TabPractice/WordDetails/Header/Title';
import TabPracticeWords from '~/components/TabPractice/Words';
import TabPracticeWordsHeaderRight from '~/components/TabPractice/Words/Header/Right';
import TabPracticeWordsHeaderTitle from '~/components/TabPractice/Words/Header/Title';
import { View } from '~/components/Themed';
import TabPracticeScreen from '~/screens/TabPracticeScreen';
import { TabPracticeParamList } from '~/types';

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
          headerRight: () => <TabPracticeWordsHeaderRight route={route} navigation={navigation} />,
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
          headerBackImage: () => (
            <View style={{ padding: 8 }}>
              <FontAwesome5 name="times" size={20} color="black" />
            </View>
          ),
          headerTitle: () => <View />,
          headerRight: () => <TabPracticeStudyHeaderRight />,
        })}
      />
    </TabPracticeStack.Navigator>
  );
}
