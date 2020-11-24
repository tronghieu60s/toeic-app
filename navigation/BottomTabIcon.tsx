import { AntDesign } from '@expo/vector-icons';
import { Route } from '@react-navigation/native';
import React from 'react';
import Colors from '~/constants/Colors';
import TabBar from '~/constants/TabBar';
import useColorScheme from '~/hooks/useColorScheme';
import { BottomTabParamList } from '~/types';
import { Text, View } from '~/components/Themed';

type Props = {
  route: Route<keyof BottomTabParamList, undefined>;
  focused: boolean;
  color: string;
};

export default function BottomTabBarIcon(props: Props): JSX.Element {
  const { route, focused, color } = props;
  const { name } = route;
  const colorScheme = useColorScheme();

  return (
    <View style={{ alignItems: 'center' }}>
      <TabBarIcon name={TabBar[name].icon} size={22} color={color} />
      {focused && (
        <Text
          weight={700}
          style={{
            color: Colors[colorScheme].tint,
            fontSize: 12,
            marginTop: 5,
          }}
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
