import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TabSettingParamList } from '~/types';
import HeaderTitle from '../components/Common/HeaderTitle';
import TabSetting from '../components/TabSetting';
import TabSettingAppDetails from '../components/TabSetting/AppDetails';

const TabSettingStack = createStackNavigator<TabSettingParamList>();

export default function TabSettingNavigator(): JSX.Element {
  return (
    <TabSettingStack.Navigator>
      <TabSettingStack.Screen
        name="TabSettingScreen"
        component={TabSetting}
        options={{ headerTitle: () => <HeaderTitle title="Cài Đặt" /> }}
      />
      <TabSettingStack.Screen
        name="TabSettingAppDetails"
        component={TabSettingAppDetails}
        options={{ headerTitle: () => <HeaderTitle title="Thông Tin Ứng Dụng" /> }}
      />
    </TabSettingStack.Navigator>
  );
}
