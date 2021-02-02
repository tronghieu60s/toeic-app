import { FontAwesome5 } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { Ripple, Text, View } from '~/src/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';

const TabPracticeStudyHeaderRight = memo(() => {
  const point = useSelector((state: RootState) => state.practice.point);

  return (
    <View style={styles.container}>
      <Ripple style={styles.iconVolume} lightColor="transparent" darkColor="transparent">
        <FontAwesome5 name="volume-mute" size={22} color="black" />
      </Ripple>
      <View style={styles.point}>
        <Text weight={700} style={tailwind('text-sm')}>
          {point}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { ...tailwind('w-28 flex-row justify-between items-center bg-transparent mr-3') },
  iconVolume: {
    ...tailwind('h-10 w-10 justify-center items-center mr-1'),
    transform: [{ rotate: '-10deg' }],
  },
  point: {
    ...tailwind('w-14 rounded-md justify-center items-center'),
    paddingVertical: 2,
    backgroundColor: '#7de3b7',
  },
});

export default TabPracticeStudyHeaderRight;
