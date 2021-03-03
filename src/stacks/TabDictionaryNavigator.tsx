import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { TabDictionaryParamList } from '~/types';
import HeaderTitle from '../components/Common/HeaderTitle';
import TabDictionary from '../components/TabDictionary';

const TabDictionaryStack = createStackNavigator<TabDictionaryParamList>();

export default function TabDictionaryNavigator(): JSX.Element {
  return (
    <TabDictionaryStack.Navigator
      screenOptions={{
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <TabDictionaryStack.Screen
        name="TabDictionaryScreen"
        component={TabDictionary}
        options={{ headerTitle: () => <HeaderTitle title="Từ Điển" /> }}
      />
    </TabDictionaryStack.Navigator>
  );
}
