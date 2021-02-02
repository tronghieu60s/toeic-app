import { FontAwesome5 } from '@expo/vector-icons';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import HeaderTitle from '~/src/components/Header/Title';
import TabDifficultRight from '~/src/components/TabDifficult/Header/Right';
import TabDifficultStudy from '~/src/components/TabDifficult/Study';
import TabPracticeStudyHeaderRight from '~/src/components/TabPractice/Study/Header/Right';
import TabPracticeWordDetails from '~/src/components/TabPractice/WordDetails';
import TabPracticeWordDetailHeaderTitle from '~/src/components/TabPractice/WordDetails/Header/Title';
import { View } from '~/src/components/Themed';
import { TabDifficultParamList } from '~/types';
import TabDifficult from '../components/TabDifficult';
import Colors from '../constants/Colors';
import { RootState } from '../redux/reducers/rootReducer';

const TabFavoriteStack = createStackNavigator<TabDifficultParamList>();

export default function TabDifficultNavigator(): JSX.Element {
  const colorScheme = useSelector((state: RootState) => state.common.theme);

  return (
    <TabFavoriteStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors[colorScheme].background },
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <TabFavoriteStack.Screen
        name="TabDifficultScreen"
        component={TabDifficult}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderTitle title="Từ khó" />,
          headerRight: () => <TabDifficultRight navigation={navigation} />,
        })}
      />
      <TabFavoriteStack.Screen
        name="TabPracticeWordDetails"
        component={TabPracticeWordDetails}
        options={({ route }) => ({
          headerTitle: () => <TabPracticeWordDetailHeaderTitle route={route} />,
        })}
      />
      <TabFavoriteStack.Screen
        name="TabDifficultStudy"
        component={TabDifficultStudy}
        options={{
          headerStyle: {
            backgroundColor: '#47d798',
          },
          headerBackImage: () => (
            <View style={{ padding: 8, backgroundColor: 'transparent' }}>
              <FontAwesome5 name="times" size={20} color="black" />
            </View>
          ),
          headerTitle: () => <View />,
          headerRight: () => <TabPracticeStudyHeaderRight />,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </TabFavoriteStack.Navigator>
  );
}
