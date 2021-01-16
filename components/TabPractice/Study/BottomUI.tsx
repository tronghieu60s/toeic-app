import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import { StatusQuestion } from '~/types';

type Props = {
  status: StatusQuestion;
  handleCheckAnswer: () => void;
};

const BottomUI = memo(({ status, handleCheckAnswer }: Props) => {
  let colorButton = '#2dce89';
  if (status === 'Correct') colorButton = '#219764';
  if (status === 'Incorrect') colorButton = '#d10a32';
  return (
    <View style={styles.viewBottom}>
      <TouchableOpacity
        style={[styles.continue, { backgroundColor: colorButton }]}
        onPress={handleCheckAnswer}
      >
        <Text weight={700} style={[styles.continueText, { color: '#fff' }]}>
          {status !== 'Waiting' ? 'Tiếp tục' : 'Kiểm tra'}
        </Text>
      </TouchableOpacity>
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
