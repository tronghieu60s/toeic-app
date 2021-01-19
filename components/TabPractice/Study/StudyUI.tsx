import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '~/components/Themed';
import { lightBulbIcon } from '~/constants/IconSource';
import { StatusQuestion, WordType } from '~/types';

type Props = {
  word: WordType;
  status: StatusQuestion;
  typeAnswer: number;
  children: JSX.Element;
};

const StudyUI = memo(({ status, word, typeAnswer, children }: Props) => {
  const { name_word, mean_word, explain_word, count_study } = word;

  let question;
  if (typeAnswer === 0) question = name_word;
  if (typeAnswer === 1) question = mean_word;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.viewTop}>
        <View style={{ flex: 8 }}>
          <Text weight={700} style={styles.question}>
            {question}
          </Text>
          {status !== 'Waiting' && <Text style={styles.explain}>{explain_word}</Text>}
        </View>
        <View style={styles.lightBulb}>
          <Image style={styles.lightBulbImage} source={lightBulbIcon[count_study || 0]} />
        </View>
      </View>
      <View style={styles.viewCenter}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewTop: {
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
  },
  explain: {
    marginTop: 2,
  },
  lightBulb: {
    flex: 2,
    alignItems: 'center',
  },
  lightBulbImage: {
    width: 40,
    height: 40,
  },
});

export default StudyUI;
