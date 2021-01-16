import { RouteProp } from '@react-navigation/native';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from '~/components/Themed';
import { RootState } from '~/redux/reducers/rootReducer';
import { TabPracticeParamList, WordType } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWordsHeaderTitle = memo(({ route }: Props) => {
  const { name_group, mean_group, pronounce_group } = route.params.group;
  const words = useSelector((state: RootState) => state.practice.words);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text weight={700} style={styles.name}>
          {name_group}
        </Text>
        <Text weight={400} style={styles.count}>
          (0/
          {words.length})
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
    color: '#5e72e4',
    fontSize: 11,
  },
});

export default TabPracticeWordsHeaderTitle;
