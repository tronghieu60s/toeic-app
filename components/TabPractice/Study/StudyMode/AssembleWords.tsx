import { Feather } from '@expo/vector-icons';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import { generateRandomChars } from '~/helpers/random';
import { WordType } from '~/types';

type PropsWord = {
  children: string;
  handleOnType: (value: string) => void;
};

const Word = memo(({ children, handleOnType }: PropsWord) => (
  <TouchableOpacity style={styles.button} onPress={() => handleOnType(children)}>
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
  const [text, onChangeText] = React.useState('');
  const [chars, setChars] = useState<string[]>([]);
  const handleOnType = (value: string) => {
    const result = `${text}${value}`;
    onChangeText(result);
    handleAnswer(result);
  };

  useEffect(() => {
    const arrStr = `${name}${generateRandomChars(5)}`.replace(' ', '').split('');
    setChars(_.shuffle(_.uniq(arrStr)));
    onChangeText('');
  }, [name]);

  const renderWords = () => {
    let result: React.ReactNode = null;
    result = chars.map((char) => (
      <Word key={char} handleOnType={handleOnType}>
        {char}
      </Word>
    ));
    return result;
  };

  return (
    <View>
      <View style={styles.inputCover}>
        <View style={styles.frame} />
        <TextInput
          multiline
          value={text}
          style={styles.input}
          placeholder="Nhập nghĩa vào đây..."
        />
      </View>
      <View style={styles.buttons}>{renderWords()}</View>
      <View style={styles.otherButtons}>
        <TouchableOpacity
          style={[styles.button, { width: 218 }]}
          onPress={() => handleOnType(' ')}
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
  inputCover: {
    width: Dimensions.get('window').width - 40,
    height: 200,
  },
  frame: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    position: 'absolute',
    backgroundColor: '#fff0',
    zIndex: 100,
  },
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
