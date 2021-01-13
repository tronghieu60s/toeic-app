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

const StudyUI = memo(({ words, correct = true, children }: Props) => (
  <View style={{ flex: 1, justifyContent: 'space-between' }}>
    <View>
      <ProcessBar percent={90} />
      <View style={styles.viewTop}>
        <Text weight={700} style={styles.question}>
          {words.mean}
        </Text>
        <View style={styles.flash}>
          <Image style={styles.flashImage} source={require('~/assets/images/lightbulb-0.png')} />
        </View>
      </View>
    </View>
    <View style={styles.viewCenter}>{children}</View>
    <View style={styles.viewBottom}>
      <TouchableOpacity
        style={[styles.continue, { backgroundColor: correct ? '#219764' : '#b4082b' }]}
      >
        <Text weight={700} style={[styles.continueText, { color: '#fff' }]}>
          Kiểm tra
          {/* Tiếp tục */}
        </Text>
      </TouchableOpacity>
    </View>
    {/* <AlertUI correct={correct} /> */}
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
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    zIndex: 100,
    marginBottom: 20,
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashImage: {
    width: 40,
    height: 40,
  },
});

export default StudyUI;
