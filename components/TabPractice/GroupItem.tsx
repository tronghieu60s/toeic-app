import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { GroupType, TabPracticeParamList } from '~/types';
import { Text } from '../Themed';

type Props = {
  group: GroupType;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const GroupItem = memo(({ group, navigation }: Props) => {
  const { name_group, pronounce_group, image_group } = group;

  return (
    <Ripple style={styles.group} onPress={() => navigation.navigate('TabPracticeWords', { group })}>
      <Image source={{ uri: image_group }} style={styles.groupImage} />
      <Text weight={700} style={styles.groupName}>
        {name_group}
      </Text>
      <Text weight={300} style={styles.groupPronounce}>
        {pronounce_group.substring(0, 15)}
        {pronounce_group.length > 15 ? '.../' : ''}
      </Text>
    </Ripple>
  );
});

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

export default GroupItem;
