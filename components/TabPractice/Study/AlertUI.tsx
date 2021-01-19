import { Feather } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Dimensions, StyleSheet, ToastAndroid } from 'react-native';
import { Ripple, Text, View } from '~/components/Themed';
import { TEXT_CORRECT, TEXT_INCORRECT } from '~/constants/Text/Study';
import { randomBetweenTwoNumber } from '~/helpers/random';
import { StatusQuestion, WordQuestion } from '~/types';

type Props = {
  wordQuestion: WordQuestion;
  status: StatusQuestion;
};

const AlertUI = memo(({ wordQuestion, status }: Props) => (
  <View style={styles.viewFinish}>
    <View
      style={[
        styles.viewFinishTab,
        { backgroundColor: status === 'Correct' ? '#2dce89' : '#f5365c' },
      ]}
    >
      <View style={styles.viewFinishLeft}>
        <Text weight={700} style={styles.alert}>
          {status === 'Correct'
            ? TEXT_CORRECT[randomBetweenTwoNumber(0, TEXT_CORRECT.length)]
            : TEXT_INCORRECT[randomBetweenTwoNumber(0, TEXT_INCORRECT.length)]}
        </Text>
        <Text style={styles.alertContent}>
          {wordQuestion.question}
          {' - '}
          {wordQuestion.answer}
        </Text>
      </View>
      <View style={styles.viewFinishRight}>
        <Ripple
          style={{ padding: 10 }}
          onPress={() => ToastAndroid.show('Chức năng này đang bảo trì.', ToastAndroid.SHORT)}
        >
          <Feather name="flag" size={20} color="#f4f5f7" />
        </Ripple>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({
  viewFinish: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 55,
    position: 'absolute',
    backgroundColor: '#fff0',
  },
  viewFinishTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  viewFinishLeft: {
    flex: 8,
    backgroundColor: '#fff0',
  },
  viewFinishRight: {
    flex: 1.4,
    backgroundColor: '#fff0',
    alignItems: 'center',
  },
  alert: {
    fontSize: 23,
    color: '#f4f5f7',
  },
  alertContent: {
    fontSize: 15.5,
    marginTop: 5,
    color: '#f4f5f7',
    flexWrap: 'wrap',
  },
});

export default AlertUI;
