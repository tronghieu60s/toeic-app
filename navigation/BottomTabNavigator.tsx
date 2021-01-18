import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets, TransitionSpecs } from '@react-navigation/stack';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Ripple } from '~/components/Themed';
import { RootState } from '~/redux/reducers/rootReducer';
import TabFavoriteNavigator from '~/stacks/TabFavoriteNavigator';
import TabPracticeNavigator from '~/stacks/TabPracticeNavigator';
import Colors from '../constants/Colors';
import { BottomTabParamList } from '../types';
import BottomTabBarIcon from './BottomTabIcon';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
  const colorScheme = useSelector((state: RootState) => state.common.theme);

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
      screenOptions={({ route, navigation }) => {
        const { routes, index } = navigation.dangerouslyGetState();
        const { state: exploreState } = routes[index];
        let tabBarVisible = true;
        if (exploreState) {
          const { routes: exploreRoutes, index: exploreIndex } = exploreState;
          const exploreActiveRoute = exploreRoutes[exploreIndex];
          if (exploreActiveRoute.name === 'TabPracticeStudy') tabBarVisible = false;
          if (exploreActiveRoute.name === 'TabPracticeWords') tabBarVisible = false;
        }
        return {
          tabBarVisible,
          tabBarButton: (props) => <Ripple {...props} />,
          tabBarIcon: (props) => <BottomTabBarIcon route={route} {...props} />,
        };
      }}
    >
      <BottomTab.Screen name="TabPractice" component={TabPracticeNavigator} />
      <BottomTab.Screen name="TabFavorite" component={TabFavoriteNavigator} />
      <BottomTab.Screen name="TabAnalysis" component={TabFavoriteNavigator} />
      <BottomTab.Screen name="TabDownload" component={TabFavoriteNavigator} />
      <BottomTab.Screen name="TabSetting" component={TabFavoriteNavigator} />
    </BottomTab.Navigator>
  );
}
