import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import { randomBetweenTwoNumber } from '~/helpers/random';
import { WordType } from '~/types';

type Props = {
  word: WordType;
  handleAnswer: (value: string) => void;
};

const ChooseWord = memo(({ word, handleAnswer }: Props) => {
  const { name, group } = word;
  const [words, setWords] = useState<WordType[]>([]);
  const [selectWords, setSelectWords] = useState(-1);

  useEffect(() => {
    const allWords: WordType[] = require('~/resource/words');
    const words: WordType[] = _.filter(allWords, (o) => o.group === group && o.name !== name);
    const indexRandom = randomBetweenTwoNumber(0, 4);
    // Shuffle Array And Add Correct Value
    const newWords = _.shuffle(words).slice(0, 5);
    newWords.splice(indexRandom, 0, word);
    setWords(newWords);
    setSelectWords(-1);
  }, [word]);

  const renderWordsSelect = () => {
    let result: React.ReactNode = null;
    result = words.map((word, index) => (
      <TouchableWithoutFeedback
        key={word.name}
        style={[styles.word, { backgroundColor: selectWords === index ? '#2dce89' : '#e1e4ea' }]}
        onPress={() => {
          setSelectWords(index);
          handleAnswer(word.name);
        }}
      >
        <Text style={styles.wordText}>{word.name}</Text>
      </TouchableWithoutFeedback>
    ));
    return result;
  };

  return <View style={styles.container}>{renderWordsSelect()}</View>;
});

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  word: {
    width: Dimensions.get('window').width / 2 - 30,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e4ea',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  wordText: {
    fontSize: 16,
  },
});

export default ChooseWord;
