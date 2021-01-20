import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Ripple, Text, View } from '~/components/Themed';
import { StatusQuestion } from '~/types';

type Props = {
  status: StatusQuestion;
  userAnswer: string;
  handleCheckAnswer: () => void;
};

const BottomUI = memo(({ status, userAnswer, handleCheckAnswer }: Props) => {
  let colorButton = '#2dce89';
  const colorText = userAnswer ? '#fff' : '#2a3547';
  if (userAnswer.length === 0) colorButton = '#d7d8dc';
  if (status === 'Correct') colorButton = '#219764';
  if (status === 'Incorrect') colorButton = '#d10a32';

  return (
    <View style={styles.viewBottom}>
      <Ripple
        rippleCentered={false}
        style={[styles.continue, { backgroundColor: colorButton }]}
        onPress={() => userAnswer && handleCheckAnswer()}
      >
        <Text weight={700} style={[styles.continueText, { color: colorText }]}>
          {status !== 'Waiting' ? 'Tiếp tục' : 'Kiểm tra'}
        </Text>
      </Ripple>
    </View>
  );
});

const styles = StyleSheet.create({
  viewBottom: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginBottom: 20,
    zIndex: 100,
  },
  continue: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2dce89',
    borderRadius: 15,
    paddingVertical: 8,
  },
  continueText: {
    fontSize: 20,
    color: '#2c3749',
    textTransform: 'capitalize',
  },
});

export default BottomUI;
