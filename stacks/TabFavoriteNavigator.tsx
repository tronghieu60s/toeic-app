import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TabFavoriteScreen from '~/screens/TabFavoriteScreen';
import { TabFavoriteParamList } from "~/types";

const TabFavoriteStack = createStackNavigator<TabFavoriteParamList>();

export default function TabFavoriteNavigator() {
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
