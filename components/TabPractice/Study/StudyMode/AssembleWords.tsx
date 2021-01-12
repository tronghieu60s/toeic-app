import { Feather } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';

type PropsWord = {
  children: string;
  handleOnPressWord: (value: string) => void;
};

const Word = memo(({ children, handleOnPressWord }: PropsWord) => (
  <TouchableOpacity style={styles.button} onPress={() => handleOnPressWord(children)}>
    <Text weight={600} style={{ fontSize: 15 }}>
      {children}
    </Text>
  </TouchableOpacity>
));

const AssembleWords = memo(() => {
  const [text, onChangeText] = React.useState('');
  const handleOnPressWord = (value: string) => onChangeText(`${text}${value}`);

  return (
    <View style={{ marginTop: 30 }}>
      <TextInput style={styles.input} onChangeText={(text) => onChangeText(text)} value={text} />
      <View style={styles.buttons}>
        <Word handleOnPressWord={handleOnPressWord}>S</Word>
      </View>
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
    backgroundColor: '#fb6340',
  },
  otherButtons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default AssembleWords;
