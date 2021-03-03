import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import TabPracticeReport from '~/src/components/TabPractice/Report';
import TabPracticeWordDetailHeaderTitle from '~/src/components/TabPractice/WordDetails/Header/Title';
import { TabDictionaryParamList } from '~/types';
import HeaderTitle from '../components/Common/HeaderTitle';
import TabDictionary from '../components/TabDictionary';
import TabDifficultWordDetails from '../components/TabDifficult/WordDetails';
import TabPracticeWordDetailsHeaderRight from '../components/TabPractice/WordDetails/Header/Right';

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
      <TabDictionaryStack.Screen
        name="TabPracticeWordDetails"
        component={TabDifficultWordDetails}
        options={({ navigation }) => ({
          headerTitle: () => <TabPracticeWordDetailHeaderTitle />,
          headerRight: () => <TabPracticeWordDetailsHeaderRight navigation={navigation} />,
        })}
      />
      <TabDictionaryStack.Screen
        name="TabPracticeReport"
        component={TabPracticeReport}
        options={{
          headerTitle: () => <HeaderTitle title="Báo Lỗi" />,
        }}
      />
    </TabDictionaryStack.Navigator>
  );
}
