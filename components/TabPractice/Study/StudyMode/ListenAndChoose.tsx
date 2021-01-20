import { SimpleLineIcons } from '@expo/vector-icons';
import _ from 'lodash';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { View } from '~/components/Themed';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import { SpeechEnglish } from '~/helpers/sound';
import { RootState } from '~/redux/reducers/rootReducer';
import { WordType } from '~/types';

type Props = {
  word: WordType;
  handleSendAnswer: (value: string) => void;
};

type PropsSound = {
  word: WordType;
  selected: boolean;
  handleSendAnswer: (value: string) => void;
};

const SoundButton = memo(({ word, selected, handleSendAnswer }: PropsSound) => {
  const soundSize = useRef(new Animated.Value(1)).current;

  const onPress = () => {
    handleSendAnswer(word.name_word || '');
    SpeechEnglish(word.name_word || '', {
      onStart: () => Animated.spring(soundSize, { toValue: 0.85, useNativeDriver: true }).start(),
      onDone: () => Animated.spring(soundSize, { toValue: 1, useNativeDriver: true }).start(),
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: soundSize }] }}>
      <TouchableWithoutFeedback
        style={[styles.sound, { backgroundColor: selected ? '#fff' : '#ffc000' }]}
        onPress={onPress}
      >
        <SimpleLineIcons name="volume-2" size={28} color="black" />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
});

const ListenAndChoose = memo(({ word, handleSendAnswer }: Props) => {
  const [selected, setSelected] = useState(-1);

  const [words, setWords] = useState<WordType[]>([]);
  const wordsState = useSelector((state: RootState) => state.practice.words);

  useEffect(() => {
    setSelected(-1);

    let words = [...wordsState];
    words = words.filter((o) => o.id_word !== word.id_word);
    words = _.shuffle(words).slice(0, 5);
    words.splice(rdNum(0, 4), 0, word);

    setWords(words);
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
  sound: {
    width: 100,
    height: 100,
    backgroundColor: '#ffc000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    transform: [{ rotate: '-10deg' }],
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#ffc000',
  },
});

export default ListenAndChoose;
