import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TabPracticeScreen from '~/screens/TabPracticeScreen';
import { TabPracticeParamList } from "~/types";

const TabPracticeStack = createStackNavigator<TabPracticeParamList>();

export default function TabPracticeNavigator() {
  return (
    <TabPracticeStack.Navigator>
      <TabPracticeStack.Screen
        name="TabPracticeScreen"
        component={TabPracticeScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabPracticeStack.Navigator>
  );
}
