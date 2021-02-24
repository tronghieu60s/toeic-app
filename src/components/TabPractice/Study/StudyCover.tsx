import React, { memo, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import Config from '~/src/constants/Config';
import { lightBulbIcon } from '~/src/constants/IconSource';
import { typeAnswersMean, typeAnswersName } from '~/src/helpers/type-condition';
import tailwind from '~/tailwind';
import { StatusQuestion, TypesAnswer, WordType } from '~/types';

const { count_max } = Config.study;

type Props = {
  word: WordType;
  status: StatusQuestion;
  typeAnswer: TypesAnswer;
  children: JSX.Element;
};

const TabPracticeStudyStudyCover = memo((props: Props) => {
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

  const iconBulb = lightBulbIcon[(count_study || 0) >= count_max ? 1 : 0];
  let textDesc = '';
  if (typeAnswer === 'CHOOSE-NAME-MEAN') textDesc = 'Chọn nghĩa đúng của từ sau:';
  if (typeAnswer === 'CHOOSE-MEAN-NAME') textDesc = 'Chọn từ đúng của nghĩa sau:';
  if (typeAnswer === 'CHOOSE-SOUND-MEAN') textDesc = 'Nghe và chọn nghĩa chính xác:';
  if (typeAnswer === 'FILL-MEAN-NAME') textDesc = 'Nhập từ vựng của nghĩa sau:';
  if (typeAnswer === 'FILL-NAME-MEAN') textDesc = 'Nhập nghĩa của từ vựng sau:';
  if (typeAnswer === 'CHOOSE-MEAN-SOUND') {
    textDesc = 'Nghe và chọn từ vựng chính xác cho nghĩa sau:';
  }

  return (
    <View style={tailwind('w-full flex-1')}>
      <View style={styles.viewTop}>
        <View style={{ flex: 8 }}>
          {textDesc.length > 0 && <Text>{textDesc}</Text>}
          <View style={tailwind('flex-row items-center mt-1')}>
            <View style={tailwind('mr-2')}>
              <Image style={tailwind('w-6 h-6')} source={iconBulb} />
            </View>
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
  viewBottom: { ...tailwind('px-5'), flex: 8, backgroundColor: '#fff0' },
});

export default TabPracticeStudyStudyCover;
