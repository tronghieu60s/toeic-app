import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ripple } from '~/src/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';
import TabDifficultNavigator from '~/src/stacks/TabDifficultNavigator';
import TabPracticeNavigator from '~/src/stacks/TabPracticeNavigator';
import { BottomTabParamList } from '../../types';
import ScreenLoading from '../components/UI/ScreenLoading';
import Colors from '../constants/Colors';
import { actLoadCommon } from '../redux/actions/commonAction';
import {
  actLoadGroups,
  actLoadWordsDifficult,
  actLoadWordsStudied,
} from '../redux/actions/practiceAction';
import { actLoadStatistics, actResetStreak } from '../redux/actions/statisticsAction';
import TabDictionaryNavigator from '../stacks/TabDictionaryNavigator';
import TabSettingNavigator from '../stacks/TabSettingNavigator';
import BottomTabIcon from './BottomTabIcon';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
  const [isPending, setIsPending] = React.useState(true);
  const dispatch = useDispatch();
  const colorScheme = useSelector((state: RootState) => state.common.theme);

  React.useEffect(() => {
    (async () => {
      await dispatch(actLoadCommon());
      await dispatch(actResetStreak());
      await dispatch(actLoadStatistics());

      await dispatch(actLoadGroups());
      await dispatch(actLoadWordsStudied());
      await dispatch(actLoadWordsDifficult());
      setIsPending(false);
    })();
  }, []);

  if (isPending) return <ScreenLoading />;

  return (
    <BottomTab.Navigator
      initialRouteName="TabPractice"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Colors[colorScheme].tint,
        activeBackgroundColor: Colors[colorScheme].background,
        inactiveBackgroundColor: Colors[colorScheme].background,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        style: { height: 55, position: 'absolute' },
      }}
      screenOptions={({ route, navigation }) => {
        const { routes, index } = navigation.dangerouslyGetState();
        const { state: exploreState } = routes[index];
        let tabBarVisible = true;
        if (exploreState && exploreState.index > 0) tabBarVisible = false;
        return {
          tabBarVisible,
          tabBarButton: (props) => <Ripple {...props} />,
          tabBarIcon: (props) => <BottomTabIcon route={route} {...props} />,
        };
      }}
    >
      <BottomTab.Screen name="TabPractice" component={TabPracticeNavigator} />
      <BottomTab.Screen name="TabDifficult" component={TabDifficultNavigator} />
      <BottomTab.Screen name="TabDictionary" component={TabDictionaryNavigator} />
      <BottomTab.Screen name="TabSetting" component={TabSettingNavigator} />
    </BottomTab.Navigator>
  );
}
