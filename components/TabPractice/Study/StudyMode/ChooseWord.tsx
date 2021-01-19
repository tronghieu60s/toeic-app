import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Text, View } from '~/components/Themed';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import { RootState } from '~/redux/reducers/rootReducer';
import { WordType } from '~/types';

type Props = {
  word: WordType;
  typeAnswer: number;
  handleSendAnswer: (value: string) => void;
};

const ChooseWord = memo(({ word, typeAnswer, handleSendAnswer }: Props) => {
  const [selectWords, setSelectWords] = useState(-1);

  const [words, setWords] = useState<WordType[]>([]);
  const wordsState = useSelector((state: RootState) => state.practice.words);

  useEffect(() => {
    setSelectWords(-1);

    let words = [...wordsState];
    if (typeAnswer === 0) words = words.filter((o) => o.name_word !== word.name_word);
    if (typeAnswer === 1) words = words.filter((o) => o.mean_word !== word.mean_word);

    words = _.shuffle(words).slice(0, 5);
    words.splice(rdNum(0, 4), 0, word);

    setWords(words);
  }, [word]);

  const renderWordsSelect = () => {
    let result: React.ReactNode = null;
    result = words.map((word, index) => {
      const bgColor = selectWords === index ? '#2dce89' : '#e1e4ea';
      const color = selectWords === index ? '#fff' : '#000';
      let name = '';
      if (typeAnswer === 0) name = word.mean_word || '';
      if (typeAnswer === 1) name = word.name_word || '';
      return (
        <TouchableWithoutFeedback
          key={word.id_word}
          style={[styles.word, { backgroundColor: bgColor }]}
          onPress={() => {
            setSelectWords(index);
            handleSendAnswer(name);
          }}
        >
          <Text style={[styles.wordText, { color }]}>{name}</Text>
        </TouchableWithoutFeedback>
      );
    });
    return result;
  };

  return <View style={styles.container}>{renderWordsSelect()}</View>;
});

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 40,
  },
  word: {
    width: Dimensions.get('window').width / 2 - 30,
    height: Dimensions.get('window').height / 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e4ea',
    marginVertical: 5,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  wordText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChooseWord;
