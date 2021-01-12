import { Feather } from '@expo/vector-icons';
import _ from 'lodash';
import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import { generateRandomChars } from '~/helpers/random';
import { WordType } from '~/types';

type PropsWord = {
  children: string;
  handleOnPressWord: (value: string) => void;
};

const Word = memo(({ children, handleOnPressWord }: PropsWord) => (
  <TouchableOpacity style={styles.button} onPress={() => handleOnPressWord(children)}>
    <Text weight={600} style={{ fontSize: 18, color: '#2c3749' }}>
      {children}
    </Text>
  </TouchableOpacity>
));

type Props = {
  words: WordType;
  handleAnswer: (value: string) => void;
};

const AssembleWords = memo(({ words, handleAnswer }: Props) => {
  const { name } = words;
  const [text, onChangeText] = React.useState('');
  const [chars] = useState(() => _.shuffle(_.uniq(`${name}${generateRandomChars(3)}`.split(''))));
  const handleOnPressWord = (value: string) => onChangeText(`${text}${value}`);

  const renderWords = () => {
    let result: React.ReactNode = null;
    result = chars.map((char) => (
      <Word key={char} handleOnPressWord={handleOnPressWord}>
        {char}
      </Word>
    ));
    return result;
  };

  return (
    <View style={{ marginTop: 30 }}>
      <TextInput style={styles.input} onChangeText={(text) => onChangeText(text)} value={text} />
      <View style={styles.buttons}>{renderWords()}</View>
      <View style={styles.otherButtons}>
        <TouchableOpacity
          style={[styles.button, { width: 210 }]}
          onPress={() => onChangeText(`${text} `)}
        />
        <TouchableOpacity style={styles.button} onPress={() => onChangeText(text.slice(0, -1))}>
          <Text weight={600} style={{ fontSize: 15 }}>
            <Feather name="delete" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    height: 40,
    borderColor: '#999999a1',
    paddingBottom: 8,
    borderBottomWidth: 1.5,
  },
  buttons: {
    marginTop: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    width: 45,
    height: 35,
    borderRadius: 7,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc000',
  },
  otherButtons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default AssembleWords;
