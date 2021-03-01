import { Feather } from '@expo/vector-icons';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { Ripple, Text, View } from '~/src/components/Themed';
import tailwind from '~/tailwind';
import { StatusQuestion, WordType } from '~/types';

type Props = {
  word: WordType;
  status: StatusQuestion;
  onPressReport: () => void;
};

export default memo(function TabPracticeStudyAlert(props: Props) {
  const { word, status, onPressReport } = props;
  const { name_word, mean_word } = word;
  const fadeOpacity = useRef(new Animated.Value(0)).current;
  const outPosition = useRef(new Animated.Value(Dimensions.get('window').height / 4)).current;

  const bgColor = status === 'Correct' ? '#2dce89' : '#f5365c';
  const textCorrect = 'Chính xác';
  const textIncorrect = 'Không chính xác';

  useEffect(() => {
    if (status !== 'Waiting') {
      Animated.spring(outPosition, {
        toValue: 0,
        speed: 100,
        useNativeDriver: true,
      }).start();
      Animated.spring(fadeOpacity, {
        toValue: 1,
        speed: 30,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  return (
    <Animated.View style={[styles.viewFinish, { opacity: fadeOpacity }]}>
      <Animated.View style={{ transform: [{ translateY: outPosition }] }}>
        <View style={[styles.viewFinishTab, { backgroundColor: bgColor }]}>
          <View style={tailwind('flex-auto bg-transparent')}>
            <Text weight={700} style={tailwind('text-2xl text-white')}>
              {status === 'Correct' ? textCorrect : textIncorrect}
            </Text>
            <Text style={tailwind('w-10/12 flex-wrap text-white text-base mt-1')}>
              {name_word}
              {' - '}
              {mean_word}
            </Text>
          </View>
          <View style={tailwind('bg-transparent items-end')}>
            <Ripple
              lightColor="transparent"
              darkColor="transparent"
              style={tailwind('p-2')}
              onPress={onPressReport}
            >
              <Feather name="flag" size={20} color="#f4f5f7" />
            </Ripple>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  viewFinish: {
    ...tailwind('w-full h-full justify-end items-end absolute bottom-0'),
    backgroundColor: '#ffffffbd',
  },
  viewFinishTab: { ...tailwind('w-full flex-row justify-between pt-4 px-4'), height: 180 },
});
