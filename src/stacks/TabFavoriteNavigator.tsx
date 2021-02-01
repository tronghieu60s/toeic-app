import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabFavoriteScreen from '~/src/screens/TabFavoriteScreen';
import { TabFavoriteParamList } from '~/types';

const TabFavoriteStack = createStackNavigator<TabFavoriteParamList>();

export default function TabFavoriteNavigator(): JSX.Element {
  return (
    <TabFavoriteStack.Navigator>
      <TabFavoriteStack.Screen
        name="TabFavoriteScreen"
        component={TabFavoriteScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabFavoriteStack.Navigator>
  );
}
