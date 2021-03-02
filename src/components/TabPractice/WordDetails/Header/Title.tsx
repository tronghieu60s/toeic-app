import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '~/src/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';

export default memo(function TabPracticeWordDetailHeaderTitle() {
  const wordDetails = useSelector((state: RootState) => state.practice.wordDetail);
  const { name_word, mean_word, pronounce_word } = wordDetails;

  return (
    <View>
      <View style={tailwind('flex-row items-center')}>
        <Text weight={700} style={tailwind('text-sm capitalize tracking-wide')}>
          {name_word?.slice(0, 20)}
          {(name_word || '').length > 20 ? '...' : ''}
        </Text>
      </View>
      <Text style={styles.pronounce}>
        {pronounce_word}
        {' - '}
        {mean_word?.slice(0, 20)}
        {(mean_word || '').length > 20 ? '...' : ''}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  pronounce: { fontSize: 11, color: '#5e72e4' },
});
