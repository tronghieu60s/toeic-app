import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Ripple } from '~/src/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';
import TabDifficultNavigator from '~/src/stacks/TabDifficultNavigator';
import TabPracticeNavigator from '~/src/stacks/TabPracticeNavigator';
import { BottomTabParamList } from '../../types';
import Colors from '../constants/Colors';
import TabSettingNavigator from '../stacks/TabSettingNavigator';
import TabStatisticsNavigator from '../stacks/TabStatisticsNavigator';
import BottomTabIcon from './BottomTabIcon';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
  const colorScheme = useSelector((state: RootState) => state.common.theme);

  return (
    <BottomTab.Navigator
      initialRouteName="TabPractice"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Colors[colorScheme].tint,
        activeBackgroundColor: Colors[colorScheme].background,
        inactiveBackgroundColor: Colors[colorScheme].background,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        style: { height: 55 },
      }}
      screenOptions={({ route, navigation }) => {
        const { routes, index } = navigation.dangerouslyGetState();
        const { state: exploreState } = routes[index];
        let tabBarVisible = true;
        if (exploreState && exploreState.index > 0) tabBarVisible = false;
        return {
          tabBarVisible,
          tabBarButton: (props) => <Ripple {...props} />,
          tabBarIcon: (props) => <BottomTabIcon route={route} {...props} />,
        };
      }}
    >
      <BottomTab.Screen name="TabPractice" component={TabPracticeNavigator} />
      <BottomTab.Screen name="TabDifficult" component={TabDifficultNavigator} />
      <BottomTab.Screen name="TabStatistics" component={TabStatisticsNavigator} />
      <BottomTab.Screen name="TabSetting" component={TabSettingNavigator} />
    </BottomTab.Navigator>
  );
}
