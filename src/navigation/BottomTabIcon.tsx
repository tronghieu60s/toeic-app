import { AntDesign } from '@expo/vector-icons';
import { Route } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { Text, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import TabBar from '~/src/constants/TabBar';
import { RootState } from '~/src/redux/reducers/rootReducer';
import { BottomTabParamList } from '~/types';

type Props = {
  route: Route<keyof BottomTabParamList, undefined>;
  focused: boolean;
  color: string;
};

export default function BottomTabBarIcon(props: Props): JSX.Element {
  const colorScheme = useSelector((state: RootState) => state.common.theme);
  const { route, focused, color } = props;
  const { name } = route;

  return (
    <View style={tailwind('items-center')}>
      <TabBarIcon name={TabBar[name].icon} size={22} color={color} />
      {focused && (
        <Text
          weight={700}
          lightColor={Colors[colorScheme].tint}
          darkColor={Colors[colorScheme].tint}
          style={{ fontSize: 12, marginTop: 4 }}
        >
          {TabBar[name].name}
        </Text>
      )}
    </View>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string; size: number }) {
  return <AntDesign style={{ marginBottom: -3 }} {...props} />;
}
