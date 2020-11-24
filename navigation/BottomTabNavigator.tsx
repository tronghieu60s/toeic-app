import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Ripple from "react-native-material-ripple";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabPracticeParamList, TabFavoriteParamList } from '../types';
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabPracticeStack = createStackNavigator<TabPracticeParamList>();

function TabPracticeNavigator() {
  return (
    <TabPracticeStack.Navigator>
      <TabPracticeStack.Screen
        name="TabPracticeScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabPracticeStack.Navigator>
  );
}

const TabFavoriteStack = createStackNavigator<TabFavoriteParamList>();

function TabFavoriteNavigator() {
  return (
    <TabFavoriteStack.Navigator>
      <TabFavoriteStack.Screen
        name="TabFavoriteScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabFavoriteStack.Navigator>
  );
}
