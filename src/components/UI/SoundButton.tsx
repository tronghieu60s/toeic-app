import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { SpeechEnglish } from '~/src/helpers/sound';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { WordType } from '~/types';
import { View } from '../Themed';

type Props = {
  word: WordType;
  size?: number;
  selected?: boolean;
  autoPlay?: boolean;
  handleSendAnswer?: (value: string) => void;
};

SoundButton.defaultProps = {
  size: 100,
  selected: false,
  autoPlay: false,
  handleSendAnswer: null,
};

const animatedValue = (toValue: number) => ({ toValue, useNativeDriver: true });

export default function SoundButton(props: Props): JSX.Element {
  const { word, size, selected, autoPlay, handleSendAnswer } = props;
  const { name_word = '' } = word;

  const common = useSelector((state: RootState) => state.common);
  const { voiceIdentify: voice, voiceRate: rate, voicePitch: pitch } = common;

  const soundSize = useRef(new Animated.Value(1)).current;
  const [soundPlayed, setSoundPlayed] = useState(false);
  const bgColor = soundPlayed || selected ? '#fff' : '#5e72e4';

  useEffect(() => {
    if (autoPlay) onPress();
  }, [word]);

  const onPress = () => {
    const onStart = () => Animated.spring(soundSize, animatedValue(0.85)).start();
    const onDone = () => {
      Animated.spring(soundSize, animatedValue(1)).start();
      setSoundPlayed(false);
    };
    setSoundPlayed(true);
    SpeechEnglish(name_word, { voice, rate, pitch, onStart, onDone, onStopped: onDone });

    if (handleSendAnswer) handleSendAnswer(name_word);
  };

  return (
    <Animated.View style={{ transform: [{ scale: soundSize }] }}>
      <TouchableWithoutFeedback
        onPress={onPress}
        style={[styles.sound, { width: size, height: size, backgroundColor: bgColor }]}
      >
        <View style={{ backgroundColor: 'transparent' }}>
          <SimpleLineIcons name="volume-2" size={(size || 100) / 3} color="black" />
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sound: {
    ...tailwind('justify-center items-center rounded'),
    backgroundColor: '#5e72e4',
    borderColor: '#5e72e4',
    borderWidth: 4,
  },
});
