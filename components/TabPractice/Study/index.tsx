import { StackNavigationProp } from '@react-navigation/stack';
import { isNull } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Alert, Keyboard, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';
import { removeVietnameseTones } from '~/helpers/convert';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import { AUDIO_CORRECT, AUDIO_FINISH, AUDIO_WRONG, playSound } from '~/helpers/sound';
import { actStudyCorrect, actStudyInCorrect, increasePoint } from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { StatusQuestion, TabPracticeParamList, WordType } from '~/types';
import AlertUI from './AlertUI';
import BottomUI from './BottomUI';
import ChooseWord from './StudyMode/ChooseWord';
import FillWord from './StudyMode/FillWord';
import ListenAndChoose from './StudyMode/ListenAndChoose';
import StudyWord from './StudyMode/StudyWord';
import StudyUI from './StudyUI';

const totalQuestions = 5;

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const TabPracticeStudy = memo(({ navigation }: Props) => {
  const [statusStudy, setStatusStudy] = useState(false);
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [userAnswer, setUserAnswer] = useState('');
  const [typeAnswer, setTypeAnswer] = useState(0);
  const [countQuestion, setCountQuestion] = useState(0);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words);
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
    if (isNull(wordQuestion.count_study)) setStatusStudy(true);
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

  const handleStudyCorrect = () => {
    dispatch(increasePoint(50));
    dispatch(actStudyCorrect(wordQuestion));

    setCountQuestion(countQuestion + 1);

    playSound(AUDIO_CORRECT);
    setStatus('Correct');
  };

  const handleStudyIncorrect = () => {
    dispatch(actStudyInCorrect(wordQuestion));

    Vibration.vibrate(200);

    playSound(AUDIO_WRONG);
    setStatus('Incorrect');
  };

  const handleAnswer = () => {
    Keyboard.dismiss();

    let answer;
    if (typeAnswer === 0) answer = wordQuestion.mean_word;
    if (typeAnswer === 1) answer = wordQuestion.name_word;

    // Handle Answer - Result
    const result = userAnswer.trim().toLowerCase();
    const arrAnswer = (answer || '').split(',').map((item) => item.trim().toLowerCase());
    const arrAnswerVn = (answer || '')
      .split(',')
      .map((item) => removeVietnameseTones(item.trim().toLowerCase()));
    const conditionArr = arrAnswer.indexOf(result) !== -1 || arrAnswerVn.indexOf(result) !== -1;
    if (conditionArr || answer === result) handleStudyCorrect();
    else handleStudyIncorrect();
  };

  const handleContinue = (): void | null => {
    if (status === 'Waiting') return handleAnswer();

    // Handle Exit Study
    if (countQuestion === totalQuestions) {
      playSound(AUDIO_FINISH);
      navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
      navigation.goBack();
      return null;
    }

    setTypeAnswer(rdNum(0, 2));

    const wordRandom = words[rdNum(0, words.length)];
    const newWordQuestion = status === 'Incorrect' || statusStudy ? wordQuestion : wordRandom;
    setWordQuestion(newWordQuestion);

    if (status === 'Incorrect') setStatusStudy(true);
    else setStatusStudy(false);

    setStatus('Waiting');
    setUserAnswer('');

    return null;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <ProcessBar percent={(countQuestion * 100) / totalQuestions} />
      {statusStudy && <StudyWord word={wordQuestion} />}
      {!statusStudy && (
        <StudyUI status={status} word={wordQuestion} typeAnswer={typeAnswer}>
          <View>
            {isNull(wordQuestion.count_study) && (
              <ChooseWord
                word={wordQuestion}
                typeAnswer={typeAnswer}
                handleSendAnswer={handleSendAnswer}
              />
            )}
            {wordQuestion.count_study === 1 && (
              <FillWord word={wordQuestion} handleSendAnswer={handleSendAnswer} />
            )}
            {wordQuestion.count_study === 2 && typeAnswer === 1 && (
              <ListenAndChoose word={wordQuestion} handleSendAnswer={handleSendAnswer} />
            )}
          </View>
        </StudyUI>
      )}
      <BottomUI status={status} userAnswer={userAnswer} handleContinue={handleContinue} />
      {status !== 'Waiting' && !statusStudy && <AlertUI status={status} word={wordQuestion} />}
    </View>
  );
});

export default TabPracticeStudy;
