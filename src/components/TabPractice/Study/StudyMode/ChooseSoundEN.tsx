import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import { shuffle } from '~/src/helpers/array';
import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import { getWordsByIdGroup } from '~/src/models/WordsModel';
import tailwind from '~/tailwind';
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
      if (getWords.data !== null) {
        let words = getWords.data;
        words = words.filter((o) => o.id_word !== word.id_word);
        words = shuffle(words).slice(0, 3);
        words.splice(rdNum(0, 4), 0, word);
        setWords(words);
      }
    })();
  }, [word]);

  const renderSoundButton = () =>
    words.map((word, index) => (
      <View key={index} style={tailwind('px-4 pb-4')}>
        <SoundButton
          word={word}
          selected={selected === index}
          handleSendAnswer={(value) => {
            setSelected(index);
            handleSendAnswer(value);
          }}
        />
      </View>
    ));

  return <View style={styles.container}>{renderSoundButton()}</View>;
});

const styles = StyleSheet.create({
  container: { ...tailwind('flex-wrap flex-row justify-center'), paddingVertical: 40 },
});

export default ChooseSoundEN;
