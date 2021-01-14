import { Feather } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Dimensions, StyleSheet, ToastAndroid } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { Text, View } from '~/components/Themed';
import { TextCorrect, TextIncorrect } from '~/constants/Text/Study';
import { randomBetweenTwoNumber } from '~/helpers/random';
import { StatusQuestion } from '~/types';

const AlertUI = memo(({ status }: { status: StatusQuestion }) => (
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
            ? TextCorrect[randomBetweenTwoNumber(0, TextCorrect.length)]
            : TextIncorrect[randomBetweenTwoNumber(0, TextIncorrect.length)]}
        </Text>
        <Text style={styles.alertContent}>This is a correct answer.</Text>
      </View>
      <View style={styles.viewFinishRight}>
        <Ripple
          style={{ padding: 10 }}
          rippleCentered
          rippleContainerBorderRadius={50}
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
    backgroundColor: '#ffffff',
  },
  viewFinishTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: 170,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  viewFinishLeft: {
    backgroundColor: '#fff0',
  },
  viewFinishRight: {
    backgroundColor: '#fff0',
  },
  alert: {
    fontSize: 25,
    color: '#f4f5f7',
  },
  alertContent: {
    fontSize: 16,
    marginTop: 5,
    color: '#f4f5f7',
  },
});

export default AlertUI;
