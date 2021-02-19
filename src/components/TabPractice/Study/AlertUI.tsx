import React, { memo, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { Text, View } from '~/src/components/Themed';
import { TEXT_CORRECT, TEXT_INCORRECT } from '~/src/constants/Text/Study';
import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import tailwind from '~/tailwind';
import { StatusQuestion, WordType } from '~/types';

type Props = {
  word: WordType;
  status: StatusQuestion;
};

const AlertUI = memo(({ word, status }: Props) => {
  const { name_word, mean_word } = word;
  const outPosition = useRef(new Animated.Value(Dimensions.get('window').height / 4)).current;

  const bgColor = status === 'Correct' ? '#2dce89' : '#f5365c';
  const textCorrect = TEXT_CORRECT[rdNum(0, TEXT_CORRECT.length)];
  const textIncorrect = TEXT_INCORRECT[rdNum(0, TEXT_INCORRECT.length)];

  useEffect(() => {
    if (status !== 'Waiting') {
      Animated.spring(outPosition, {
        toValue: 0,
        speed: 30,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  return (
    <View style={styles.viewFinish}>
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
            {/* <Ripple
              lightColor="transparent"
              darkColor="transparent"
              style={tailwind('p-2')}
              onPress={onPressReport}
            >
              <Feather name="flag" size={20} color="#f4f5f7" />
            </Ripple> */}
          </View>
        </View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewFinish: {
    ...tailwind('w-full justify-end items-end absolute bottom-0'),
    backgroundColor: '#fff0',
  },
  viewFinishTab: { ...tailwind('w-full flex-row justify-between pt-4 px-4'), height: 180 },
});

export default AlertUI;
