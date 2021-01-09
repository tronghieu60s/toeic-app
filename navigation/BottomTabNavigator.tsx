import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
// @ts-ignore
import Ripple from "react-native-material-ripple";
import TabFavoriteNavigator from '~/stacks/TabFavoriteNavigator';
import TabPracticeNavigator from '~/stacks/TabPracticeNavigator';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import BottomTabBarIcon from './BottomTabIcon';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const tabBarOptions = {
    showLabel: false,
    activeTintColor: Colors[colorScheme].tint,
    inactiveTintColor: '#AAA',
    style: { height: 55 },
  };

  return (
    <BottomTab.Navigator
      initialRouteName="TabPractice"
      tabBarOptions={tabBarOptions}
      screenOptions={({ route }) => ({
        tabBarButton: (props) => <Ripple rippleCentered {...props} />,
        tabBarIcon: (props) => <BottomTabBarIcon route={route} {...props} />,
      })}
    >
      <BottomTab.Screen name="TabPractice" component={TabPracticeNavigator} />
      <BottomTab.Screen name="TabFavorite" component={TabFavoriteNavigator} />
      <BottomTab.Screen name="TabAnalysis" component={TabFavoriteNavigator} />
      <BottomTab.Screen name="TabDownload" component={TabFavoriteNavigator} />
      <BottomTab.Screen name="TabSetting" component={TabFavoriteNavigator} />
    </BottomTab.Navigator>
  );
}