import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '~/src/components/Themed';
import SoundButton from '~/src/components/UI/SoundButton';
import Config from '~/src/constants/Config';
import { lightBulbIcon } from '~/src/constants/IconSource';
import Layout from '~/src/constants/Layout';
import { isTypeAnswersMean, isTypeAnswersName } from '~/src/helpers/study';
import tailwind from '~/tailwind';
import { TypesAnswer, WordType } from '~/types';

const { width } = Layout.window;
const { count_max } = Config.study;

type Props = {
  word: WordType;
  typeAnswer: TypesAnswer;
  children: JSX.Element;
};

export default memo(function TabPracticeStudyStudyCover(props: Props) {
  const { word, typeAnswer, children } = props;
  const { name_word, mean_word, pronounce_word, count_study } = word;

  let question = '';
  if (isTypeAnswersMean(typeAnswer)) question = name_word || '';
  if (isTypeAnswersName(typeAnswer)) question = mean_word || '';

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
    <View style={{ ...tailwind('flex-1'), width }}>
      <View style={styles.viewTop}>
        <View style={{ flex: 8 }}>
          {textDesc.length > 0 && <Text>{textDesc}</Text>}
          <View style={tailwind('flex-row items-center mt-1')}>
            <View style={tailwind('mr-2')}>
              <Image style={tailwind('w-6 h-6')} source={iconBulb} />
            </View>
            {typeAnswer === 'CHOOSE-SOUND-MEAN' && <SoundButton size={60} word={word} />}
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
