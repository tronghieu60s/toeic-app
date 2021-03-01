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
  const { name_group, pronounce_group = '', image_group, lock_group = 1 } = group;

  const handlePressGroup = async () => {
    // if (lock_group === 0) navigation.navigate('TabPracticeWords', { group });
    navigation.navigate('TabPracticeWords', { group });
  };

  return (
    <Ripple style={styles.group} onPress={handlePressGroup}>
      {/* {lock_group === 1 && (
        <View style={{ ...tailwind('absolute bg-transparent'), right: 10, top: 10 }}>
          <AntDesign name="lock" size={20} color="#555" />
        </View>
      )} */}
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
    minWidth: Dimensions.get('window').width * (40 / 100),
    maxWidth: Dimensions.get('window').width * (60 / 100),
  },
  groupPronounce: { ...tailwind('text-xs'), color: '#888', marginTop: 2 },
});
