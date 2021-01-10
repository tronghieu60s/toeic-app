import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { GroupType, TabPracticeParamList } from '~/types';
import { Text } from '../Themed';

type Props = {
  group: GroupType[string];
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default function GroupItem({ navigation, group }: Props): JSX.Element {
  const { name, image, pronounce } = group;

  return (
    <Ripple
      style={styles.group}
      //onPress={() => navigation.navigate('TabLessonsScreen', { title, name: key || '' })}
    >
      <Image source={{ uri: image }} style={styles.groupImage} />
      <Text weight={700} style={styles.groupName}>
        {name}
      </Text>
      <Text weight={300} style={styles.groupPronounce}>
        {pronounce.substring(0, 15)}
        {pronounce.length > 15 ? '.../' : ''}
      </Text>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  group: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  groupName: {
    fontSize: 14,
    marginTop: 2,
  },
  groupImage: {
    width: 25,
    height: 25,
  },
  groupPronounce: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
});
