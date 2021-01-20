import React, { memo, useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet } from 'react-native';
import { Text, View } from '~/components/Themed';
import { lightBulbIcon } from '~/constants/IconSource';
import { SpeechEnglish } from '~/helpers/sound';
import { StatusQuestion, WordType } from '~/types';

type Props = {
  word: WordType;
  status: StatusQuestion;
  typeAnswer: number;
  children: JSX.Element;
};

const StudyUI = memo(({ status, word, typeAnswer, children }: Props) => {
  const opacityMean = useRef(new Animated.Value(0)).current;
  const scaleLightBulb = useRef(new Animated.Value(1)).current;
  const { name_word, mean_word, pronounce_word, explain_word, count_study } = word;

  let question = '';
  if (typeAnswer === 0) question = name_word || '';
  if (typeAnswer === 1) question = mean_word || '';

  useEffect(() => {
    if (typeAnswer === 0) SpeechEnglish(question);
  }, [word]);

  useEffect(() => {
    if (status === 'Correct') {
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
    <View style={{ flex: 1 }}>
      <View style={styles.viewTop}>
        <View style={{ flex: 8 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text weight={700} style={styles.question}>
              {question}
              {typeAnswer === 0 && ` - ${pronounce_word}`}
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
          <Image style={styles.lightBulbImage} source={lightBulbIcon[count_study || 0]} />
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
