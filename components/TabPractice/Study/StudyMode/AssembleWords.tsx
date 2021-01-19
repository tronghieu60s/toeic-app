import React, { memo, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { View } from '~/components/Themed';
import { WordQuestion } from '~/types';

type Props = {
  wordQuestion: WordQuestion;
  handleSendAnswer: (value: string) => void;
};

const AssembleWords = memo(({ wordQuestion, handleSendAnswer }: Props) => {
  const [text, onChangeText] = React.useState('');

  useEffect(() => {
    onChangeText('');
  }, [wordQuestion]);

  const handleChangeText = (value: string) => {
    onChangeText(value);
    handleSendAnswer(value);
  };

  return (
    <View style={{ paddingVertical: 60 }}>
      <TextInput
        multiline
        autoFocus
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
    height: Dimensions.get('window').height / 3.5,
    borderColor: '#999999a1',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1.5,
    backgroundColor: '#f4f5f7',
    textAlignVertical: 'top',
  },
});

export default AssembleWords;
