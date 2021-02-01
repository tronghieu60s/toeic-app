import { FontAwesome5 } from '@expo/vector-icons';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import HeaderTitle from '~/src/components/Header/Title';
import TabDifficultRight from '~/src/components/TabDifficult/Header/Right';
import TabDifficultStudy from '~/src/components/TabDifficult/Study';
import TabPracticeStudyHeaderRight from '~/src/components/TabPractice/Study/Header/Right';
import TabPracticeWordDetails from '~/src/components/TabPractice/WordDetails';
import TabPracticeWordDetailHeaderTitle from '~/src/components/TabPractice/WordDetails/Header/Title';
import { View } from '~/src/components/Themed';
import TabDifficultScreen from '~/src/screens/TabDifficultScreen';
import { TabDifficultParamList } from '~/types';

const TabFavoriteStack = createStackNavigator<TabDifficultParamList>();

export default function TabDifficultNavigator(): JSX.Element {
  return (
    <TabFavoriteStack.Navigator
      screenOptions={{
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <TabFavoriteStack.Screen
        name="TabDifficultScreen"
        component={TabDifficultScreen}
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
