import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SpeechEnglish } from '~/helpers/sound';
import { WordType } from '~/types';

type PropsSound = {
  word: WordType;
  size?: number;
  selected?: boolean;
  autoPlay?: boolean;
  handleSendAnswer?: (value: string) => void;
};

const SoundButton = ({ word, size, selected, autoPlay, handleSendAnswer }: PropsSound) => {
  const soundSize = useRef(new Animated.Value(1)).current;
  const bgColor = selected ? '#fff' : '#ffc000';

  useEffect(() => {
    if (autoPlay) onPress();
  }, []);

  const onPress = () => {
    if (handleSendAnswer) handleSendAnswer(word.name_word || '');
    SpeechEnglish(word.name_word || '', {
      onStart: () => Animated.spring(soundSize, { toValue: 0.85, useNativeDriver: true }).start(),
      onDone: () => Animated.spring(soundSize, { toValue: 1, useNativeDriver: true }).start(),
      onStopped: () => Animated.spring(soundSize, { toValue: 1, useNativeDriver: true }).start(),
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: soundSize }] }}>
      <TouchableWithoutFeedback
        onPress={onPress}
        style={[styles.sound, { width: size, height: size, backgroundColor: bgColor }]}
      >
        <SimpleLineIcons name="volume-2" size={28} color="black" />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

SoundButton.defaultProps = {
  size: 100,
  selected: false,
  autoPlay: false,
  handleSendAnswer: null,
};

const styles = StyleSheet.create({
  sound: {
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

export default SoundButton;
