import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Ripple from "react-native-material-ripple";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
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
      <BottomTab.Screen name="TabPractice" component={TabOneNavigator} />
      <BottomTab.Screen name="TabFavorite" component={TabTwoNavigator} />
      <BottomTab.Screen name="TabAnalysis" component={TabTwoNavigator} />
      <BottomTab.Screen name="TabDownload" component={TabTwoNavigator} />
      <BottomTab.Screen name="TabSetting" component={TabTwoNavigator} />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
