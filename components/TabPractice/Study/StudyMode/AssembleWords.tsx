import { Feather } from '@expo/vector-icons';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import { generateRandomChars } from '~/helpers/random';
import { spliceString } from '~/helpers/string';
import { WordType } from '~/types';

type PropsWord = {
  children: string;
  handleOnPressWord: (value: string) => void;
};

const Word = memo(({ children, handleOnPressWord }: PropsWord) => (
  <TouchableOpacity style={styles.button} onPress={() => handleOnPressWord(children)}>
    <Text weight={600} style={styles.buttonText}>
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
  const [selection, setSelection] = useState({ end: 0, start: 0 });
  const [text, onChangeText] = React.useState('');
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    const arrStr = `${name}${generateRandomChars(5)}`.replace(' ', '').split('');
    setChars(_.shuffle(_.uniq(arrStr)));
    onChangeText('');
  }, [name]);

  const handleOnPressWord = (value: string) => {
    Keyboard.dismiss();
    const { start, end } = selection;
    if (start === end) {
      const result = text.slice(0, start) + value + text.slice(start);
      setSelection({ start: start + 1, end: end + 1 });
      onChangeText(result);
      handleAnswer(result);
    }
  };

  const handleDeleteWord = () => {
    const { start, end } = selection;
    let result = text;
    if (start === end && start > 0) {
      result = result.slice(0, start - 1) + result.slice(start);
      setSelection({ start: start - 1, end: start - 1 });
    } else result = spliceString(result, start, end);
    onChangeText(result);
  };

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
    <View>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={(text) => {
          onChangeText(text);
          handleAnswer(text);
        }}
        selection={selection}
        onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
        value={text}
        placeholder="Nhập nghĩa vào đây..."
      />
      <View style={styles.buttons}>{renderWords()}</View>
      <View style={styles.otherButtons}>
        <TouchableOpacity
          style={[styles.button, { width: 218 }]}
          onPress={() => handleOnPressWord(' ')}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleDeleteWord()}>
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
    height: 200,
    borderColor: '#999999a1',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1.5,
    backgroundColor: '#f4f5f7',
    textAlignVertical: 'top',
  },
  buttons: {
    marginTop: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    width: 47,
    height: 38,
    borderRadius: 7,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc000',
  },
  buttonText: {
    fontSize: 19,
  },
  otherButtons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default AssembleWords;
