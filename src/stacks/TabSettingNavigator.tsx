import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TabSettingParamList } from '~/types';
import HeaderTitle from '../components/Header/Title';
import TabSetting from '../components/TabSetting';

const TabSettingStack = createStackNavigator<TabSettingParamList>();

export default function TabSettingNavigator(): JSX.Element {
  return (
    <TabSettingStack.Navigator>
      <TabSettingStack.Screen
        name="TabSettingScreen"
        component={TabSetting}
        options={{ headerTitle: () => <HeaderTitle title="Cài Đặt" /> }}
      />
    </TabSettingStack.Navigator>
  );
}
