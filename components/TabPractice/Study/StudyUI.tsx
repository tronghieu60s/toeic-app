import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';
import { StatusQuestion, WordType } from '~/types';
import AlertUI from './AlertUI';

type Props = {
  status: StatusQuestion;
  words: WordType;
  handleClickAnswer: () => void;
  children: JSX.Element;
};

const StudyUI = memo(({ words, status = 'Waiting', handleClickAnswer, children }: Props) => {
  let colorButton = '#2dce89';
  if (status === 'Correct') colorButton = '#219764';
  if (status === 'Incorrect') colorButton = '#b4082b';
  return (
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
          style={[styles.continue, { backgroundColor: colorButton }]}
          onPress={handleClickAnswer}
        >
          <Text weight={700} style={[styles.continueText, { color: '#fff' }]}>
            {status !== 'Waiting' ? 'Tiếp tục' : 'Kiểm tra'}
          </Text>
        </TouchableOpacity>
      </View>
      {status !== 'Waiting' && <AlertUI status={status} />}
    </View>
  );
});

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
    backgroundColor: '#2dce89',
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
