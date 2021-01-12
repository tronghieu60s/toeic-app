import React, { memo } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';
import { WordType } from '~/types';
import AlertUI from './AlertUI';

type Props = {
  correct: boolean;
  words: WordType;
  children: JSX.Element;
};

const StudyUI = memo(({ words, correct = false, children }: Props) => (
  <View style={{ flex: 1 }}>
    <ProcessBar percent={90} />
    <View style={styles.viewTop}>
      <Text weight={700} style={styles.question}>
        {words.mean}
      </Text>
      <Image style={styles.flash} source={require('~/assets/images/lightbulb-0.png')} />
    </View>
    <View style={styles.viewCenter}>{children}</View>
    <View style={styles.viewBottom}>
      <TouchableOpacity
        style={[styles.continue, { backgroundColor: correct ? '#57cc02' : '#ff4b4c' }]}
      >
        <Text weight={700} style={[styles.continueText, { color: '#fff' }]}>
          {/* Kiểm tra */}
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
    <AlertUI correct={correct} />
  </View>
));

const styles = StyleSheet.create({
  viewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  viewCenter: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  viewBottom: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff0',
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 20,
    zIndex: 100,
  },
  continue: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc000',
    borderRadius: 15,
    paddingVertical: 8,
  },
  continueText: {
    fontSize: 20,
    color: '#2c3749',
    textTransform: 'capitalize',
  },
  question: {
    flex: 8,
    fontSize: 18,
  },
  flash: {
    width: 40,
    height: 40,
  },
});

export default StudyUI;
