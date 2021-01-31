import { FontAwesome5 } from '@expo/vector-icons';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import HeaderTitle from '~/components/Header/Title';
import TabDifficultRight from '~/components/TabDifficult/Header/Right';
import TabDifficultStudy from '~/components/TabDifficult/Study';
import TabPracticeStudyHeaderRight from '~/components/TabPractice/Study/Header/Right';
import TabPracticeWordDetails from '~/components/TabPractice/WordDetails';
import TabPracticeWordDetailHeaderTitle from '~/components/TabPractice/WordDetails/Header/Title';
import { View } from '~/components/Themed';
import TabDifficultScreen from '~/screens/TabDifficultScreen';
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
