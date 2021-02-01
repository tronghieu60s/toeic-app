import { FontAwesome5 } from '@expo/vector-icons';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import TabPracticeHeaderTitle from '~/src/components/TabPractice/Header/Title';
import TabPracticeStudy from '~/src/components/TabPractice/Study';
import TabPracticeStudyHeaderRight from '~/src/components/TabPractice/Study/Header/Right';
import TabPracticeWordDetails from '~/src/components/TabPractice/WordDetails';
import TabPracticeWordDetailHeaderTitle from '~/src/components/TabPractice/WordDetails/Header/Title';
import TabPracticeWords from '~/src/components/TabPractice/Words';
import TabPracticeWordsHeaderRight from '~/src/components/TabPractice/Words/Header/Right';
import TabPracticeWordsHeaderTitle from '~/src/components/TabPractice/Words/Header/Title';
import { View } from '~/src/components/Themed';
import TabPracticeScreen from '~/src/screens/TabPracticeScreen';
import { TabPracticeParamList } from '~/types';
import Colors from '../constants/Colors';
import { RootState } from '../redux/reducers/rootReducer';

const TabPracticeStack = createStackNavigator<TabPracticeParamList>();

export default function TabPracticeNavigator(): JSX.Element {
  const colorScheme = useSelector((state: RootState) => state.common.theme);

  return (
    <TabPracticeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors[colorScheme].background },
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <TabPracticeStack.Screen
        name="TabPracticeScreen"
        component={TabPracticeScreen}
        options={{ headerTitle: () => <TabPracticeHeaderTitle /> }}
      />
      <TabPracticeStack.Screen
        name="TabPracticeWords"
        component={TabPracticeWords}
        options={({ route, navigation }) => ({
          headerTitle: () => <TabPracticeWordsHeaderTitle route={route} />,
          headerRight: () => <TabPracticeWordsHeaderRight navigation={navigation} />,
        })}
      />
      <TabPracticeStack.Screen
        name="TabPracticeWordDetails"
        component={TabPracticeWordDetails}
        options={({ route }) => ({
          headerTitle: () => <TabPracticeWordDetailHeaderTitle route={route} />,
        })}
      />
      <TabPracticeStack.Screen
        name="TabPracticeStudy"
        component={TabPracticeStudy}
        options={{
          headerStyle: { backgroundColor: '#47d798' },
          headerBackImage: () => (
            <View style={tailwind('p-3 bg-transparent')}>
              <FontAwesome5 name="times" size={20} color="black" />
            </View>
          ),
          headerTitle: () => <View />,
          headerRight: () => <TabPracticeStudyHeaderRight />,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </TabPracticeStack.Navigator>
  );
}
