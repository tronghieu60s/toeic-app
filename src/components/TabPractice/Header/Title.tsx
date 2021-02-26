import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '~/src/components/Themed';
import Colors from '~/src/constants/Colors';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';

export default memo(function TabPracticeTitle() {
  const colorScheme = useSelector((state: RootState) => state.common.theme);

  return (
    <View style={tailwind('flex-row items-center')}>
      <Text weight={700} style={styles.text}>
        TOEIC
      </Text>
      <Text weight={700} style={[styles.text, { color: Colors[colorScheme].tint }]}>
        Essential Words
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  text: { ...tailwind('text-lg tracking-wide ml-1') },
});
