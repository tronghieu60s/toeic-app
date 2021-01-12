import { Feather } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import { Text, View } from '~/components/Themed';

const AlertUI = memo(({ correct }: { correct: boolean }) => (
  <View
    style={[
      styles.viewFinish,
      {
        backgroundColor: correct ? '#d7ffb8' : '#ffdfe0',
      },
    ]}
  >
    <View style={styles.viewFinishLeft}>
      <Text weight={700} style={[styles.alert, { color: correct ? '#58a700' : '#e92b2b' }]}>
        Trả lời đúng:
      </Text>
      <Text style={[styles.alertContent, { color: correct ? '#59a409' : '#e82c2b' }]}>
        This is a correct answer.
      </Text>
    </View>
    <View style={styles.viewFinishRight}>
      <Ripple style={{ padding: 10 }} rippleCentered rippleContainerBorderRadius={50}>
        <Feather name="flag" size={20} color={correct ? '#58a700' : '#e92b2b'} />
      </Ripple>
    </View>
  </View>
));

const styles = StyleSheet.create({
  viewFinish: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: 160,
    paddingTop: 20,
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
  },
  viewFinishLeft: {
    backgroundColor: '#fff0',
  },
  viewFinishRight: {
    backgroundColor: '#fff0',
  },
  alert: {
    fontSize: 22,
  },
  alertContent: {
    fontSize: 15,
    marginTop: 5,
  },
});

export default AlertUI;
