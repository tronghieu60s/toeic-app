import { RouteProp } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '~/src/components/Themed';
import { RootState } from '~/src/redux/reducers/rootReducer';
import { TabPracticeParamList } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWordsHeaderTitle = memo(({ route }: Props) => {
  const { name_group, mean_group, pronounce_group } = route.params.group;
  const words = useSelector((state: RootState) => state.practice.words);
  const wordsComplete = words.filter((o) => (o.count_study || 0) >= 5);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text weight={700} style={styles.name}>
          {name_group}
        </Text>
        <Text weight={400} style={styles.count}>
          (
          {wordsComplete.length}
          /
          {words.length}
          )
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
  name: {
    fontSize: 16,
    letterSpacing: 0.7,
  },
  count: {
    fontSize: 11,
    marginLeft: 4,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  mean: {
    width: '80%',
    color: '#5e72e4',
    fontSize: 11,
  },
});

export default TabPracticeWordsHeaderTitle;
