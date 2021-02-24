import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { View } from '~/src/components/Themed';
import { WordType } from '~/types';

type Props = {
  word: WordType;
  handleSendAnswer: (value: string) => void;
};

const FillWord = React.memo(({ word, handleSendAnswer }: Props) => {
  const [text, onChangeText] = React.useState('');

  useEffect(() => {
    onChangeText('');
  }, [word]);

  const handleChangeText = (value: string) => {
    onChangeText(value);
    handleSendAnswer(value);
  };

  return (
    <View style={{ marginTop: 40 }}>
      <TextInput
        multiline
        value={text}
        style={styles.input}
        placeholder="Nhập nghĩa vào đây..."
        onChangeText={(text) => handleChangeText(text)}
      />
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
});

export default FillWord;
