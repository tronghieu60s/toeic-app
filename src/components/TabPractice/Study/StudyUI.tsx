/* eslint-disable operator-linebreak */
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet } from 'react-native';
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
  const { name_word, mean_word, pronounce_word, explain_word, count_study } = word;

  const [countStudy, setCountStudy] = useState(count_study);

  useEffect(() => {
    setCountStudy(word.count_study);
  }, [word]);

  let question = '';
  if (typeAnswersMean(typeAnswer)) question = name_word || '';
  if (typeAnswersName(typeAnswer)) question = mean_word || '';

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

  return (
    <View style={{ flex: 1, width: Dimensions.get('window').width }}>
      <View style={styles.viewTop}>
        <View style={{ flex: 8 }}>
          <View style={{ flexDirection: 'row' }}>
            {typeAnswer === 'CHOOSE-SOUND-MEAN' && <SoundButton size={70} word={word} autoPlay />}
            <Text weight={700} style={styles.question}>
              {question}
              {(typeAnswer === 'CHOOSE-NAME-MEAN' || typeAnswer === 'FILL-NAME-MEAN') &&
                ` - ${pronounce_word}`}
            </Text>
          </View>
          <Animated.View style={{ opacity: opacityMean, width: '92%' }}>
            <Text style={styles.explain}>
              {explain_word?.slice(0, 70)}
              {(explain_word || '').length > 70 && '...'}
            </Text>
          </Animated.View>
        </View>
        <Animated.View style={[styles.lightBulb, { transform: [{ scale: scaleLightBulb }] }]}>
          <Image style={styles.lightBulbImage} source={lightBulbIcon[countStudy || 0]} />
        </Animated.View>
      </View>
      <View style={styles.viewCenter}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewTop: {
    height: Dimensions.get('window').height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  viewCenter: {
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 18,
    width: '90%',
  },
  explain: {
    marginTop: 2,
  },
  lightBulb: {
    flex: 1.2,
    alignItems: 'center',
    marginTop: 15,
  },
  lightBulbImage: {
    width: 40,
    height: 40,
  },
});

export default StudyUI;
