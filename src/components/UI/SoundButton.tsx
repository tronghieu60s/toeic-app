import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import tailwind from '~/tailwind';
import { SpeechEnglish } from '~/src/helpers/sound';
import { WordType } from '~/types';

type Props = {
  word: WordType;
  size?: number;
  selected?: boolean;
  autoPlay?: boolean;
  handleSendAnswer?: (value: string) => void;
};

const animatedValue = (toValue: number) => ({ toValue, useNativeDriver: true });

const SoundButton = (props: Props) => {
  const { word, size, selected, autoPlay, handleSendAnswer } = props;
  const { name_word = '' } = word;

  const soundSize = useRef(new Animated.Value(1)).current;
  const [soundPlayed, setSoundPlayed] = useState(false);
  const bgColor = soundPlayed || selected ? '#fff' : '#5e72e4';

  useEffect(() => {
    if (autoPlay) onPress();
  }, [word]);

  const onPress = () => {
    setSoundPlayed(true);
    SpeechEnglish(name_word, {
      onStart: () => Animated.spring(soundSize, animatedValue(0.85)).start(),
      onDone: () => {
        Animated.spring(soundSize, animatedValue(1)).start();
        setSoundPlayed(false);
      },
      onStopped: () => {
        Animated.spring(soundSize, animatedValue(1)).start();
        setSoundPlayed(false);
      },
    });

    if (handleSendAnswer) handleSendAnswer(name_word);
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
    ...tailwind('justify-center items-center'),
    backgroundColor: '#5e72e4',
    borderWidth: 5,
    borderRadius: 120,
    borderColor: '#5e72e4',
    transform: [{ rotate: '-10deg' }],
  },
});

export default SoundButton;
