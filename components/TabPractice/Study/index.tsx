/* eslint-disable operator-linebreak */
import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import { isNull } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  Vibration,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';
import { removeVietnameseTones as rmVN } from '~/helpers/convert';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import { AUDIO_CORRECT, AUDIO_CORRECT_FULL, AUDIO_FINISH, AUDIO_WRONG, playSound } from '~/helpers/sound';
import { actStudyCorrect, actStudyInCorrect, increasePoint } from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { StatusQuestion, TabPracticeParamList, TypesAnswer, WordType } from '~/types';
import AlertUI from './AlertUI';
import BottomUI from './BottomUI';
import StudyMode from './StudyMode';
import StudyWord from './StudyMode/StudyWord';
import StudyUI from './StudyUI';

const totalQuestions = 10;

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const TabPracticeStudy = memo(({ navigation }: Props) => {
  const [statusStudy, setStatusStudy] = useState<boolean>();
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [userAnswer, setUserAnswer] = useState('');
  const [typeAnswer, setTypeAnswer] = useState<TypesAnswer>('CHOOSE-NAME-MEAN');
  const [countQuestion, setCountQuestion] = useState(0);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words).filter(
    (o) => (o.count_study || 0) < 5,
  );
  const [wordQuestion, setWordQuestion] = useState<WordType>(() => words[rdNum(0, words.length)]);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert(
        'Thoát phiên học',
        'Bạn có chắc muốn thoát phiên học này không? Kết quả sẽ được lưu lại.',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Thoát',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });
  }, []);

  useEffect(() => {
    Speech.stop();
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    const { count_study } = wordQuestion;
    if (isNull(count_study)) setStatusStudy(true);

    // White -> Black -> Red -> Yellow -> Green -> Blue
    if (isNull(count_study)) setTypeAnswer('CHOOSE-NAME-MEAN');
    if (count_study === 1) setTypeAnswer('CHOOSE-SOUND-MEAN');
    if (count_study === 2) setTypeAnswer('CHOOSE-MEAN-NAME');
    if (count_study === 3) setTypeAnswer('FILL-MEAN-NAME');
    if (count_study === 4) setTypeAnswer('CHOOSE-MEAN-SOUND');
    if (count_study === 5) setTypeAnswer('FILL-NAME-MEAN');
  }, [wordQuestion]);

  useEffect(() => {
    // Handle Button Continue If Count Study === null
    if (statusStudy) {
      setStatus('Correct');
      setUserAnswer('Continue');
    }
  }, [statusStudy]);

  const handleSendAnswer = (value: string) => {
    const userAnswer = value.trim().toLowerCase();
    setUserAnswer(userAnswer);
  };

  const handleAnswer = () => {
    Keyboard.dismiss();

    let answer;
    if (
      typeAnswer === 'CHOOSE-MEAN-NAME' ||
      typeAnswer === 'CHOOSE-MEAN-SOUND' ||
      typeAnswer === 'FILL-MEAN-NAME'
    ) {
      answer = wordQuestion.name_word;
    }
    if (
      typeAnswer === 'CHOOSE-NAME-MEAN' ||
      typeAnswer === 'FILL-NAME-MEAN' ||
      typeAnswer === 'CHOOSE-SOUND-MEAN'
    ) {
      answer = wordQuestion.mean_word;
    }

    // Handle Answer - Result
    const result = userAnswer.trim().toLowerCase();
    const arrAnswer = (answer || '').split(',').map((item) => item.trim().toLowerCase());
    const arrAnswerVn = (answer || '').split(',').map((item) => rmVN(item.trim().toLowerCase()));

    const conditionArr = arrAnswer.indexOf(result) !== -1 || arrAnswerVn.indexOf(result) !== -1;
    if (conditionArr || answer === result) {
      dispatch(increasePoint(50));
      dispatch(actStudyCorrect(wordQuestion));

      setCountQuestion(countQuestion + 1);

      if (wordQuestion.count_study === 4) playSound(AUDIO_CORRECT_FULL);
      else playSound(AUDIO_CORRECT);
      setStatus('Correct');
    } else {
      dispatch(actStudyInCorrect(wordQuestion));

      Vibration.vibrate(200);

      playSound(AUDIO_WRONG);
      setStatus('Incorrect');
    }
  };

  const handleContinue = (): void | null => {
    Speech.stop();
    if (status === 'Waiting') return handleAnswer();

    // Handle Exit Study
    if (countQuestion === totalQuestions || words.length === 0) {
      playSound(AUDIO_FINISH);
      navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
      navigation.goBack();
      return null;
    }

    const wordRandom = words[rdNum(0, words.length)];
    const newWordQuestion = status === 'Incorrect' || statusStudy ? wordQuestion : wordRandom;
    setWordQuestion(newWordQuestion);

    if (status === 'Incorrect') setStatusStudy(true);
    else setStatusStudy(false);

    setUserAnswer('');
    setStatus('Waiting');

    return null;
  };

  if (!wordQuestion || !typeAnswer) return <View />;

  return (
    <View style={styles.container}>
      <ProcessBar percent={(countQuestion * 100) / totalQuestions} />
      {statusStudy && <StudyWord word={wordQuestion} />}
      {!statusStudy && (
        <StudyUI status={status} word={wordQuestion} typeAnswer={typeAnswer}>
          <StudyMode
            word={wordQuestion}
            typeAnswer={typeAnswer}
            handleSendAnswer={handleSendAnswer}
          />
        </StudyUI>
      )}
      <BottomUI status={status} userAnswer={userAnswer} handleContinue={handleContinue} />
      {status !== 'Waiting' && !statusStudy && <AlertUI status={status} word={wordQuestion} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default TabPracticeStudy;
