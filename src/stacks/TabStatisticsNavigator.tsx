import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { TabStatisticsParamList } from '~/types';
import HeaderTitle from '../components/Common/HeaderTitle';
import TabStatistics from '../components/TabStatistics';

const TabStatisticsStack = createStackNavigator<TabStatisticsParamList>();

export default function TabStatisticsNavigator(): JSX.Element {
  return (
    <TabStatisticsStack.Navigator
      screenOptions={{
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <TabStatisticsStack.Screen
        name="TabStatisticsScreen"
        component={TabStatistics}
        options={{ headerTitle: () => <HeaderTitle title="Thống Kê" /> }}
      />
    </TabStatisticsStack.Navigator>
  );
}
