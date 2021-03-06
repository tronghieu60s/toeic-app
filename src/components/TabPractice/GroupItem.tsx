import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import tailwind from '~/tailwind';
import { GroupType, TabPracticeParamList } from '~/types';
import { Ripple, Text } from '../Themed';

type Props = {
  group: GroupType;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default memo(function GroupItem(props: Props) {
  const { group, navigation } = props;
  const { name_group, pronounce_group = '', image_group } = group;

  const handlePressGroup = async () => {
    navigation.navigate('TabPracticeWords', { group });
  };

  return (
    <Ripple style={styles.group} onPress={handlePressGroup}>
      <Image source={{ uri: image_group }} style={tailwind('w-6 h-6')} />
      <Text weight={700} style={{ fontSize: 13, marginTop: 5 }}>
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
    width: Dimensions.get('window').width / 2 - 13,
  },
  groupPronounce: { fontSize: 11, color: '#888', marginTop: 2 },
});
