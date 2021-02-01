import _, { isNull } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text, View } from '~/src/components/Themed';
import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import { getWordsByIdGroup } from '~/src/models/WordsModel';
import { TypesAnswer, WordType } from '~/types';

type Props = {
  word: WordType;
  typeAnswer: TypesAnswer;
  handleSendAnswer: (value: string) => void;
};

const ChooseWord = memo(({ word, typeAnswer, handleSendAnswer }: Props) => {
  const [selectWords, setSelectWords] = useState(-1);
  const [words, setWords] = useState<WordType[]>([]);

  useEffect(() => {
    setSelectWords(-1);

    (async () => {
      const getWords = await getWordsByIdGroup(word);
      if (!isNull(getWords.data)) {
        let words = getWords.data;
        words = words.filter((o) => o.id_word !== word.id_word);
        words = _.shuffle(words).slice(0, 5);
        words.splice(rdNum(0, 5), 0, word);
        setWords(words);
      }
    })();
  }, [word]);

  const renderWordsSelect = () => {
    let result: React.ReactNode = null;
    result = words.map((word, index) => {
      const bgColor = selectWords === index ? '#2dce89' : '#e1e4ea';
      const color = selectWords === index ? '#fff' : '#000';

      let name = '';
      if (typeAnswer === 'CHOOSE-NAME-MEAN' || typeAnswer === 'CHOOSE-SOUND-MEAN') {
        name = word.mean_word || '';
      }
      if (typeAnswer === 'CHOOSE-MEAN-NAME') name = word.name_word || '';

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
    paddingVertical: 20,
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
