/* eslint-disable operator-linebreak */
import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
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
import AlertUI from '~/components/TabPractice/Study/AlertUI';
import BottomUI from '~/components/TabPractice/Study/BottomUI';
import StudyMode from '~/components/TabPractice/Study/StudyMode';
import StudyWord from '~/components/TabPractice/Study/StudyMode/StudyWord';
import StudyUI from '~/components/TabPractice/Study/StudyUI';
import { View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';
import { convertWordsBase, removeVietnameseTones as rmVN } from '~/helpers/convert';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import { AUDIO_CORRECT, AUDIO_FINISH, AUDIO_WRONG, playSound } from '~/helpers/sound';
import { typeAnswersMean, typeAnswersName } from '~/helpers/type-condition';
import { actStudyCorrectDifficult, increasePoint } from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { StatusQuestion, TabDifficultParamList, TypesAnswer, WordType } from '~/types';

const totalQuestions = 10;

type Props = {
  navigation: StackNavigationProp<TabDifficultParamList, 'TabDifficultStudy'>;
};

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const TabDifficultStudy = memo(({ navigation }: Props) => {
  const [statusStudy, setStatusStudy] = useState<boolean>();
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [userAnswer, setUserAnswer] = useState('');
  const [typeAnswer, setTypeAnswer] = useState<TypesAnswer>('CHOOSE-NAME-MEAN');
  const [countQuestion, setCountQuestion] = useState(0);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.wordsDifficult);
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

    const rdCountStudy = rdNum(0, 6);
    // White -> Black -> Red -> Yellow -> Green -> Blue
    if (rdCountStudy === 0) setTypeAnswer('CHOOSE-NAME-MEAN');
    if (rdCountStudy === 1) setTypeAnswer('CHOOSE-SOUND-MEAN');
    if (rdCountStudy === 2) setTypeAnswer('CHOOSE-MEAN-NAME');
    if (rdCountStudy === 3) setTypeAnswer('FILL-MEAN-NAME');
    if (rdCountStudy === 4) setTypeAnswer('CHOOSE-MEAN-SOUND');
    if (rdCountStudy === 5) setTypeAnswer('FILL-NAME-MEAN');
  }, [wordQuestion]);

  useEffect(() => {
    // Handle Button Continue If Count Study === null
    if (statusStudy) {
      setStatus('Correct');
      setUserAnswer('Continue');
    }
  }, [statusStudy]);

  const handleAnswer = () => {
    Keyboard.dismiss();

    let answer;
    if (typeAnswersName(typeAnswer)) answer = wordQuestion.name_word;
    if (typeAnswersMean(typeAnswer)) answer = wordQuestion.mean_word;

    // Handle Answer - Result
    const result = convertWordsBase(userAnswer);
    const arrAnswer = (answer || '').split(',').map((item) => convertWordsBase(item));
    const arrAnswerVn = (answer || '').split(',').map((item) => rmVN(convertWordsBase(item)));

    const conditionArr = arrAnswer.indexOf(result) !== -1 || arrAnswerVn.indexOf(result) !== -1;
    if (conditionArr || answer === result) {
      dispatch(increasePoint(50));
      dispatch(actStudyCorrectDifficult(wordQuestion));

      setCountQuestion(countQuestion + 1);

      playSound(AUDIO_CORRECT);
      setStatus('Correct');
    } else {
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

  return (
    <View style={styles.container}>
      <ProcessBar percent={(countQuestion * 100) / totalQuestions} />
      {statusStudy && <StudyWord word={wordQuestion} />}
      {!statusStudy && (
        <StudyUI status={status} word={wordQuestion} typeAnswer={typeAnswer}>
          <StudyMode
            word={wordQuestion}
            typeAnswer={typeAnswer}
            handleSendAnswer={(value) => setUserAnswer(convertWordsBase(value))}
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

export default TabDifficultStudy;
