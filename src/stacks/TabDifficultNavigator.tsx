import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderTitle from '~/src/components/Common/HeaderTitle';
import TabDifficultRight from '~/src/components/TabDifficult/Header/Right';
import TabDifficultStudy from '~/src/components/TabDifficult/Study';
import TabPracticeReport from '~/src/components/TabPractice/Report';
import TabPracticeResult from '~/src/components/TabPractice/Result';
import TabPracticeStudyHeaderBackImage from '~/src/components/TabPractice/Study/Header/BackImage';
import TabPracticeStudyHeaderRight from '~/src/components/TabPractice/Study/Header/Right';
import TabPracticeWordDetailHeaderTitle from '~/src/components/TabPractice/WordDetails/Header/Title';
import { View } from '~/src/components/Themed';
import { TabDifficultParamList } from '~/types';
import TabDifficult from '../components/TabDifficult';
import TabDifficultWordDetails from '../components/TabDifficult/WordDetails';
import TabPracticeWordDetailsHeaderRight from '../components/TabPractice/WordDetails/Header/Right';
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
        component={TabDifficultWordDetails}
        options={({ navigation }) => ({
          headerTitle: () => <TabPracticeWordDetailHeaderTitle />,
          headerRight: () => <TabPracticeWordDetailsHeaderRight navigation={navigation} />,
        })}
      />
      <TabFavoriteStack.Screen
        name="TabDifficultStudy"
        component={TabDifficultStudy}
        options={({ navigation }) => {
          navigation.addListener('beforeRemove', (e: any) => {
            e.preventDefault();

            Alert.alert(
              'Thoát phiên học',
              'Bạn có chắc muốn thoát phiên học này không? Kết quả sẽ được lưu lại.',
              [
                { text: 'Hủy', style: 'cancel' },
                {
                  text: 'Thoát',
                  style: 'destructive',
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ],
            );
          });

          return {
            headerStyle: { backgroundColor: '#47d798' },
            headerBackImage: () => <TabPracticeStudyHeaderBackImage />,
            headerTitle: () => <View />,
            headerRight: () => <TabPracticeStudyHeaderRight />,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          };
        }}
      />
      <TabFavoriteStack.Screen
        name="TabPracticeResult"
        component={TabPracticeResult}
        options={{
          headerTitle: () => <HeaderTitle title="Kết Quả" />,
        }}
      />
      <TabFavoriteStack.Screen
        name="TabPracticeReport"
        component={TabPracticeReport}
        options={{
          headerTitle: () => <HeaderTitle title="Báo Lỗi" />,
        }}
      />
    </TabFavoriteStack.Navigator>
  );
}
