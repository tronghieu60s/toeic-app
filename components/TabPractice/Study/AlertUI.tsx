import { Feather } from '@expo/vector-icons';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, ToastAndroid } from 'react-native';
import { Ripple, Text, View } from '~/components/Themed';
import { TEXT_CORRECT, TEXT_INCORRECT } from '~/constants/Text/Study';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import { StatusQuestion, WordType } from '~/types';

type Props = {
  word: WordType;
  status: StatusQuestion;
};

const AlertUI = memo(({ word, status }: Props) => {
  const outPosition = useRef(new Animated.Value(Dimensions.get('window').height / 4)).current;

  const { name_word, mean_word } = word;
  const bgColor = status === 'Correct' ? '#2dce89' : '#f5365c';
  const textCorrect = TEXT_CORRECT[rdNum(0, TEXT_CORRECT.length)];
  const textIncorrect = TEXT_INCORRECT[rdNum(0, TEXT_INCORRECT.length)];

  useEffect(() => {
    if (status !== 'Waiting') {
      Animated.spring(outPosition, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  return (
    <View style={styles.viewFinish}>
      <Animated.View style={{ transform: [{ translateY: outPosition }] }}>
        <View style={[styles.viewFinishTab, { backgroundColor: bgColor }]}>
          <View style={styles.viewFinishLeft}>
            <Text weight={700} style={styles.alert}>
              {status === 'Correct' ? textCorrect : textIncorrect}
            </Text>
            <Text style={styles.alertContent}>
              {name_word}
              {' - '}
              {mean_word}
            </Text>
          </View>
          <View style={styles.viewFinishRight}>
            <Ripple
              style={{ padding: 10 }}
              onPress={() => ToastAndroid.show('Chức Năng Này Đang Bảo Trì.', ToastAndroid.SHORT)}
            >
              <Feather name="flag" size={20} color="#f4f5f7" />
            </Ripple>
          </View>
        </View>
      </Animated.View>
    </View>
  );
});

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
