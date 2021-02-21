import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import { typeAnswersMean, typeAnswersName } from '~/src/helpers/type-condition';
import tailwind from '~/tailwind';
import { StatusQuestion, TypesAnswer, WordType } from '~/types';

type Props = {
  word: WordType;
  status: StatusQuestion;
  typeAnswer: TypesAnswer;
  children: JSX.Element;
};

export default memo(function TabPracticeStudyStudyCover(props: Props) {
  const { status, word, typeAnswer, children } = props;
  const { name_word, mean_word, pronounce_word, count_study } = word;
  const [countStudy, setCountStudy] = useState(count_study);

  useEffect(() => {
    setCountStudy(word.count_study);
  }, [word]);

  useEffect(() => {
    if (status === 'Correct') {
      const newCount = (countStudy || 0) < 5 ? (countStudy || 0) + 1 : countStudy;
      setCountStudy(newCount);
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
            {typeAnswer === 'CHOOSE-SOUND-MEAN' && <SoundButton size={70} word={word} />}
            <Text weight={700} style={tailwind('text-lg w-10/12')}>
              {typeAnswer !== 'CHOOSE-SOUND-MEAN' && question}
              {(typeAnswer === 'CHOOSE-NAME-MEAN' || typeAnswer === 'FILL-NAME-MEAN') &&
                ` - ${pronounce_word}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.viewBottom}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  viewTop: { ...tailwind('flex-row justify-between px-6 mt-3'), flex: 2 },
  viewBottom: { ...tailwind('px-5'), flex: 8 },
});
