import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { TabSettingParamList } from '~/types';
import HeaderTitle from '../components/Common/HeaderTitle';
import TabSetting from '../components/TabSetting';
import TabSettingAppDetails from '../components/TabSetting/AppDetails';
import TabSettingBackupRestore from '../components/TabSetting/BackupRestore';

const TabSettingStack = createStackNavigator<TabSettingParamList>();

export default function TabSettingNavigator(): JSX.Element {
  return (
    <TabSettingStack.Navigator
      screenOptions={{
        headerStyle: { elevation: 1, shadowOpacity: 0 },
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
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
      <TabSettingStack.Screen
        name="TabSettingBackupRestore"
        component={TabSettingBackupRestore}
        options={{ headerTitle: () => <HeaderTitle title="Sao Lưu và Khôi Phục" /> }}
      />
    </TabSettingStack.Navigator>
  );
}
