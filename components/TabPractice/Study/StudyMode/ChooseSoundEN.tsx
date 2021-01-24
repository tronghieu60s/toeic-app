import _, { isNull } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '~/components/Themed';
import SoundButton from '~/components/UI/SoundButton';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import { getWordsByIdGroup } from '~/models/WordsModel';
import { WordType } from '~/types';

type Props = {
  word: WordType;
  handleSendAnswer: (value: string) => void;
};

const ChooseSoundEN = memo(({ word, handleSendAnswer }: Props) => {
  const [selected, setSelected] = useState(-1);

  const [words, setWords] = useState<WordType[]>([]);

  useEffect(() => {
    setSelected(-1);

    (async () => {
      const getWords = await getWordsByIdGroup(word);
      if (!isNull(getWords.data)) {
        let words = getWords.data;
        words = words.filter((o) => o.id_word !== word.id_word);
        words = _.shuffle(words).slice(0, 3);
        words.splice(rdNum(0, 4), 0, word);
        setWords(words);
      }
    })();
  }, [word]);

  const renderSoundButton = () => {
    let result: React.ReactNode = null;
    result = words.map((word, index) => (
      <SoundButton
        key={word.id_word}
        word={word}
        selected={selected === index}
        handleSendAnswer={(value) => {
          setSelected(index);
          handleSendAnswer(value);
        }}
      />
    ));
    return result;
  };

  return <View style={styles.container}>{renderSoundButton()}</View>;
});

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});

export default ChooseSoundEN;
