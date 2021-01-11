import { RouteProp } from '@react-navigation/native';
import _ from 'lodash';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '~/components/Themed';
import { TabPracticeParamList, WordType } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const allWords: WordType[] = require('~/resource/words');

const TabPracticeWordsHeaderTitle = memo(({ route }: Props) => {
  const { key, name, mean, pronounce } = route.params.group;

  const words: WordType[] = _.filter(allWords, (o) => o.group === key);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text weight={700} style={styles.name}>
          {name}
        </Text>
        <Text weight={400} style={styles.count}>
          (0/
          {words.length}
          )
        </Text>
      </View>
      <Text style={styles.mean}>
        {pronounce}
        {' - '}
        {mean}
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
    textTransform: 'capitalize',
  },
});

export default TabPracticeWordsHeaderTitle;
