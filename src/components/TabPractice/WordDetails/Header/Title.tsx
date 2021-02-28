import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '~/src/components/Themed';
import tailwind from '~/tailwind';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWordDetails'>;
};

export default memo(function TabPracticeWordDetailHeaderTitle(props: Props) {
  const { route } = props;
  const { name_word, mean_word, pronounce_word } = route.params.word;

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
        {mean_word?.slice(0, 30)}
        {(mean_word || '').length > 30 ? '...' : ''}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  pronounce: { fontSize: 11, color: '#5e72e4' },
});
