import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '~/src/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
};

export default memo(function TabPracticeWordsHeaderTitle(props: Props) {
  const { route } = props;
  const { name_group, mean_group, pronounce_group } = route.params.group;

  const words = useSelector((state: RootState) => state.practice.words);
  const wordsComplete = words.filter((o) => (o.count_study || 0) >= 6).length;

  return (
    <View style={tailwind('bg-transparent')}>
      <View style={tailwind('flex-row items-center')}>
        <Text weight={700} style={tailwind('text-sm tracking-wider')}>
          {name_group?.slice(0, 20)}
          {(name_group || '').length > 20 ? '...' : ''}
        </Text>
        <Text weight={400} style={styles.count}>
          {`(${wordsComplete}/${words.length})`}
        </Text>
      </View>
      <Text style={styles.mean}>
        {pronounce_group}
        {' - '}
        {mean_group}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  count: { ...tailwind('ml-2'), fontSize: 9, letterSpacing: 1.2, marginTop: 2 },
  mean: { ...tailwind('w-10/12'), fontSize: 11, color: '#5e72e4' },
});
