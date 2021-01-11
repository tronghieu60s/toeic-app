import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ScrollView } from '~/components/Themed';
import Center from '~/components/UI/Center';
import Words from '~/components/UI/Words';
import { TabPracticeParamList, WordType } from '~/types';

type Props = {
  route: RouteProp<TabPracticeParamList, 'TabPracticeWords'>;
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeWords'>;
};

const TabPracticeWords = memo(({ route, navigation }: Props) => {
  const { key } = route.params.group;
  const [loadWords, setLoadWords] = useState(false);
  const [words, setWords] = useState<WordType[]>([]);

  useEffect(() => {
    const allWords: WordType[] = require('~/resource/words');
    const words: WordType[] = _.filter(allWords, (o) => o.group === key);
    setWords(words);
    setLoadWords(true);
  }, []);

  const renderWords = () => {
    let result: React.ReactNode = null;
    result = words.map((word) => <Words key={word.name} word={word} />);
    return result;
  };

  if (words.length <= 0 && !loadWords) {
    return (
      <Center>
        <ActivityIndicator size="small" color="#0000ff" />
      </Center>
    );
  }

  if (words.length <= 0 && loadWords) {
    return <Center>Bài học này đang cập nhật. Vui lòng quay lại sau.</Center>;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.group}>{renderWords()}</View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  group: {
    marginVertical: 5,
    backgroundColor: '#f3f3f3',
  },
  fixed: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    zIndex: 100,
  },
  play: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5e72e4',
    borderRadius: 50 / 2,
  },
  icon: {
    backgroundColor: 'transparent',
    marginLeft: 3,
    marginTop: 1,
  },
});

export default TabPracticeWords;
