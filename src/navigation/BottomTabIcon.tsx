import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Route } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import TabBar from '~/src/constants/TabBar';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { BottomTabParamList } from '~/types';

type Props = {
  route: Route<keyof BottomTabParamList, undefined>;
  focused: boolean;
};

export default function BottomTabBarIcon(props: Props): JSX.Element {
  const { route, focused } = props;
  const { name } = route;

  const colorScheme = useSelector((state: RootState) => state.common.theme);
  const wordsDifficult = useSelector((state: RootState) => state.practice.wordsDifficult);
  const numberIconShow = name === 'TabDifficult';
  let number = name === 'TabDifficult' ? wordsDifficult.length : '0';
  number = number >= 10 ? number : `0${number}`;

  return (
    <View style={tailwind('items-center justify-center')}>
      <View>
        <TabBarIcon
          name={TabBar[name].icon}
          type={TabBar[name].type}
          size={22}
          color={focused ? '#5e72e4' : '#777'}
        />
        {numberIconShow && number !== '00' && <Text style={styles.number}>{number}</Text>}
      </View>
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

type TabBarType = { name: string; type: string; color: string; size: number };

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: TabBarType) {
  const { type } = props;
  if (type === 'AntDesign') return <AntDesign style={{ marginBottom: -3 }} {...props} />;
  if (type === 'Feather') return <Feather style={{ marginBottom: -3 }} {...props} />;
  if (type === 'Ionicons') return <Ionicons style={{ marginBottom: -3 }} {...props} />;
  return <></>;
}

const styles = StyleSheet.create({
  number: {
    fontSize: 6,
    color: '#fff',
    backgroundColor: '#5e72e4',
    position: 'absolute',
    bottom: -5,
    right: -3,
    padding: 2,
    borderRadius: 15,
  },
});
