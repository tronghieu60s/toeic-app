/* eslint-disable operator-linebreak */
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import { Text, View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import { lightBulbIcon } from '~/src/constants/IconSource';
import { typeAnswersMean, typeAnswersName } from '~/src/helpers/type-condition';
import { StatusQuestion, TypesAnswer, WordType } from '~/types';

type Props = {
  word: WordType;
  status: StatusQuestion;
  typeAnswer: TypesAnswer;
  children: JSX.Element;
};

const StudyUI = memo(({ status, word, typeAnswer, children }: Props) => {
  const opacityMean = useRef(new Animated.Value(0)).current;
  const scaleLightBulb = useRef(new Animated.Value(1)).current;
  const { name_word, mean_word, pronounce_word, explain_word = '', count_study } = word;

  const [countStudy, setCountStudy] = useState(count_study);

  useEffect(() => {
    setCountStudy(word.count_study);
  }, [word]);

  useEffect(() => {
    if (status === 'Correct') {
      const newCount = (countStudy || 0) < 5 ? (countStudy || 0) + 1 : countStudy;
      setCountStudy(newCount);
      Animated.spring(scaleLightBulb, {
        toValue: 1.3,
        useNativeDriver: true,
      }).start();
      Animated.spring(opacityMean, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      opacityMean.setValue(0);
      scaleLightBulb.setValue(1);
    }
  }, [status]);

  let question = '';
  if (typeAnswersMean(typeAnswer)) question = name_word || '';
  if (typeAnswersName(typeAnswer)) question = mean_word || '';

  return (
    <View style={tailwind('w-full flex-1')}>
      <View style={styles.viewTop}>
        <View style={{ flex: 8 }}>
          <View style={tailwind('flex-row')}>
            {typeAnswer === 'CHOOSE-SOUND-MEAN' && <SoundButton size={70} word={word} autoPlay />}
            <Text weight={700} style={tailwind('text-lg w-10/12')}>
              {typeAnswer !== 'CHOOSE-SOUND-MEAN' && question}
              {(typeAnswer === 'CHOOSE-NAME-MEAN' || typeAnswer === 'FILL-NAME-MEAN') &&
                ` - ${pronounce_word}`}
            </Text>
          </View>
          <Animated.View style={{ opacity: opacityMean, width: '92%' }}>
            <Text style={tailwind('mt-1')}>
              {explain_word.slice(0, 70)}
              {explain_word.length > 70 && '...'}
            </Text>
          </Animated.View>
        </View>
        <Animated.View style={[styles.lightBulb, { transform: [{ scale: scaleLightBulb }] }]}>
          <Image style={tailwind('w-10 h-10')} source={lightBulbIcon[countStudy || 0]} />
        </Animated.View>
      </View>
      <View style={tailwind('px-5')}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewTop: {
    ...tailwind('flex-row justify-between px-6 mt-3'),
    height: Dimensions.get('window').height / 10,
  },
  lightBulb: {
    ...tailwind('items-center mt-2'),
    flex: 1.2,
  },
});

export default StudyUI;
