import { CardStyleInterpolators, createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import HeaderTitle from '~/components/Header/Title';
import TabPracticeWordDetails from '~/components/TabPractice/WordDetails';
import TabPracticeWordDetailHeaderTitle from '~/components/TabPractice/WordDetails/Header/Title';
import TabDifficultScreen from '~/screens/TabDifficultScreen';
import { TabDifficultParamList } from '~/types';

const TabFavoriteStack = createStackNavigator<TabDifficultParamList>();

export default function TabDifficultNavigator(): JSX.Element {
  return (
    <TabFavoriteStack.Navigator
      screenOptions={{
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <TabFavoriteStack.Screen
        name="TabDifficultScreen"
        component={TabDifficultScreen}
        options={{ headerTitle: () => <HeaderTitle title="Từ khó" /> }}
      />
      <TabFavoriteStack.Screen
        name="TabPracticeWordDetails"
        component={TabPracticeWordDetails}
        options={({ route }) => ({
          headerTitle: () => <TabPracticeWordDetailHeaderTitle route={route} />,
        })}
      />
    </TabFavoriteStack.Navigator>
  );
}
