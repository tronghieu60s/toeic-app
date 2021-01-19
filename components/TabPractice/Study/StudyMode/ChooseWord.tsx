import React, { memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Text, View } from '~/components/Themed';
import { RootState } from '~/redux/reducers/rootReducer';
import { WordType } from '~/types';

type Props = {
  wordsAnswer: WordType[];
  handleSendAnswer: (value: string) => void;
};

const ChooseWord = memo(({ wordsAnswer, handleSendAnswer }: Props) => {
  const [selectWords, setSelectWords] = useState(-1);

  const typePractice = useSelector((state: RootState) => state.practice.typePractice);

  useEffect(() => {
    setSelectWords(-1);
  }, [wordsAnswer]);

  const renderWordsSelect = (wordsAnswer: WordType[]) => {
    let result: React.ReactNode = null;
    result = wordsAnswer.map((word, index) => {
      let wordShow = '';
      if (typePractice === 'NAME-MEAN') wordShow = word.mean_word || '';
      if (typePractice === 'MEAN-NAME') wordShow = word.name_word || '';
      return (
        <TouchableWithoutFeedback
          key={word.id_word}
          style={[styles.word, { backgroundColor: selectWords === index ? '#2dce89' : '#e1e4ea' }]}
          onPress={() => {
            setSelectWords(index);
            handleSendAnswer(wordShow || '');
          }}
        >
          <Text style={styles.wordText}>{wordShow}</Text>
        </TouchableWithoutFeedback>
      );
    });
    return result;
  };

  return <View style={styles.container}>{renderWordsSelect(wordsAnswer)}</View>;
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
    height: 150,
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
