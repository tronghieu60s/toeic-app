import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/src/components/Themed';
import tailwind from '~/tailwind';
import { StatusQuestion } from '~/types';

type Props = {
  answer: string;
  status: StatusQuestion;
  handleContinue: () => void;
};

export default memo(function TabPracticeStudyBottom(props: Props) {
  const { answer, status, handleContinue } = props;

  const textButton = status !== 'Waiting' ? 'Tiếp tục' : 'Kiểm tra';
  const colorTextButton = answer ? '#fff' : '#2a3547';
  const disabledButton = answer.length === 0;

  let colorButton = '#2dce89';
  if (answer.length === 0) colorButton = '#d7d8dc';
  if (status === 'Correct') colorButton = '#219764';
  if (status === 'Incorrect') colorButton = '#d10a32';

  return (
    <View style={styles.viewBottom}>
      <TouchableOpacity
        disabled={disabledButton}
        style={[styles.continue, { backgroundColor: colorButton }]}
        onPress={handleContinue}
      >
        <Text weight={700} style={[styles.continueText, { color: colorTextButton }]}>
          {textButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  viewBottom: { ...tailwind('bg-transparent px-4 mb-4 z-50') },
  continue: {
    ...tailwind('justify-center items-center rounded-2xl py-2'),
    backgroundColor: '#2dce89',
  },
  continueText: { ...tailwind('text-xl capitalize'), color: '#2c3749' },
});
