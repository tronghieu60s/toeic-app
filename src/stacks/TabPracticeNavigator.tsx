import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import TabPracticeHeaderTitle from '~/src/components/TabPractice/Header/Title';
import TabPracticeReport from '~/src/components/TabPractice/Report';
import TabPracticeResult from '~/src/components/TabPractice/Result';
import TabPracticeAlert from '~/src/components/TabPractice/Alert';
import TabPracticeStudy from '~/src/components/TabPractice/Study';
import TabPracticeStudyHeaderRight from '~/src/components/TabPractice/Study/Header/Right';
import TabPracticeWordDetails from '~/src/components/TabPractice/WordDetails';
import TabPracticeWordDetailsHeaderRight from '~/src/components/TabPractice/WordDetails/Header/Right';
import TabPracticeWordDetailHeaderTitle from '~/src/components/TabPractice/WordDetails/Header/Title';
import TabPracticeWords from '~/src/components/TabPractice/Words';
import TabPracticeWordsHeaderRight from '~/src/components/TabPractice/Words/Header/Right';
import TabPracticeWordsHeaderTitle from '~/src/components/TabPractice/Words/Header/Title';
import { View } from '~/src/components/Themed';
import { TabPracticeParamList } from '~/types';
import HeaderTitle from '../components/Common/HeaderTitle';
import TabPractice from '../components/TabPractice';
import TabPracticeStudyHeaderBackImage from '../components/TabPractice/Study/Header/BackImage';
import Colors from '../constants/Colors';
import { RootState } from '../redux/reducers/rootReducer';

const TabPracticeStack = createStackNavigator<TabPracticeParamList>();

export default function TabPracticeNavigator(): JSX.Element {
  const colorScheme = useSelector((state: RootState) => state.common.theme);

  return (
    <TabPracticeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
          elevation: 1,
          shadowOpacity: 0,
        },
        headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <TabPracticeStack.Screen
        name="TabPracticeScreen"
        component={TabPractice}
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
        options={({ navigation }) => ({
          headerTitle: () => <TabPracticeWordDetailHeaderTitle />,
          headerRight: () => <TabPracticeWordDetailsHeaderRight navigation={navigation} />,
        })}
      />
      <TabPracticeStack.Screen
        name="TabPracticeReport"
        component={TabPracticeReport}
        options={{
          headerTitle: () => <HeaderTitle title="Báo Lỗi" />,
        }}
      />
      <TabPracticeStack.Screen
        name="TabPracticeResult"
        component={TabPracticeResult}
        options={{
          headerTitle: () => <HeaderTitle title="Kết Quả" />,
        }}
      />
      <TabPracticeStack.Screen
        name="TabPracticeAlert"
        component={TabPracticeAlert}
        options={{
          headerTitle: () => <HeaderTitle title="Thông Báo" />,
        }}
      />
      <TabPracticeStack.Screen
        name="TabPracticeStudy"
        component={TabPracticeStudy}
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
    </TabPracticeStack.Navigator>
  );
}
