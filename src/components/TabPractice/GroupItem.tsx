import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import { GroupType, TabPracticeParamList } from '~/types';
import { Ripple, Text } from '../Themed';

type Props = {
  group: GroupType;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const GroupItem = memo(({ group, navigation }: Props) => {
  const { name_group, pronounce_group = '', image_group } = group;

  const handlePressGroup = () => navigation.navigate('TabPracticeWords', { group });

  return (
    <Ripple style={styles.group} onPress={handlePressGroup}>
      <Image source={{ uri: image_group }} style={tailwind('w-6 h-6')} />
      <Text weight={700} style={tailwind('text-sm mt-1')}>
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
    ...tailwind('justify-center mb-3 mx-1 p-5 rounded-lg'),
    width: Dimensions.get('window').width / 2 - 15,
  },
  groupPronounce: {
    ...tailwind('text-xs'),
    color: '#888',
    marginTop: 2,
  },
});

export default GroupItem;
