import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Keyboard, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AlertUI from '~/src/components/TabPractice/Study/Alert';
import BottomUI from '~/src/components/TabPractice/Study/Bottom';
import StudyUI from '~/src/components/TabPractice/Study/StudyCover';
import StudyMode from '~/src/components/TabPractice/Study/StudyMode';
import StudyWord from '~/src/components/TabPractice/Study/StudyMode/StudyWord';
import { View } from '~/src/components/Themed';
import ProcessBar from '~/src/components/UI/ProcessBar';
import { convertWordsBase, removeVietnameseTones as rmVN } from '~/src/helpers/convert';
import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import { typeAnswersMean, typeAnswersName } from '~/src/helpers/type-condition';
import { actStudyCorrectDifficult, increasePoint } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { StatusQuestion, TabDifficultParamList, TypesAnswer, WordType } from '~/types';

type Props = {
  navigation: StackNavigationProp<TabDifficultParamList, 'TabDifficultStudy'>;
};

const TabDifficultStudy = React.memo(({ navigation }: Props) => {
  const totalQuestions = 10;
  const [status, setStatus] = useState<StatusQuestion>('Waiting');
  const [statusStudy, setStatusStudy] = useState<boolean>();

  const [userAnswer, setUserAnswer] = useState('');
  const [typeAnswer, setTypeAnswer] = useState<TypesAnswer>();
  const [countQuestion, setCountQuestion] = useState(0);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.wordsDifficult);
  const [wordQuestion, setWordQuestion] = useState<WordType>(() => words[0]);

  useEffect(() => {
    Speech.stop();

    const rdStudy = rdNum(1, 5);
    if (rdStudy === 1) setTypeAnswer('CHOOSE-MEAN-NAME');
    if (rdStudy === 2) setTypeAnswer('CHOOSE-SOUND-MEAN');
    if (rdStudy === 3) setTypeAnswer('FILL-MEAN-NAME');
    if (rdStudy === 4) setTypeAnswer('CHOOSE-MEAN-SOUND');
    if (rdStudy === 5) setTypeAnswer('FILL-NAME-MEAN');

    const { difficult_study } = wordQuestion;
    if (difficult_study === 1) {
      setStatusStudy(true);
      setTypeAnswer('CHOOSE-NAME-MEAN');
    }
  }, [wordQuestion]);

  useEffect(() => {
    // Handle Button Continue If Count Study === null
    if (statusStudy) {
      setStatus('Correct');
      setUserAnswer('Continue');
    }
  }, [statusStudy]);

  const handleSendAnswer = (value: string) => setUserAnswer(convertWordsBase(value));
  const handleAnswer = async () => {
    Keyboard.dismiss();

    let expected = '';
    if (typeAnswersName(typeAnswer || 'CHOOSE-MEAN-NAME')) expected = wordQuestion.name_word || '';
    if (typeAnswersMean(typeAnswer || 'CHOOSE-MEAN-NAME')) expected = wordQuestion.mean_word || '';
    expected = convertWordsBase(expected);

    const arrExpected = expected.split(',').map((s) => convertWordsBase(s));
    const arrExpectedVn = expected.split(',').map((s) => rmVN(convertWordsBase(s)));

    const actual = convertWordsBase(userAnswer);
    const conditionArr = arrExpected.indexOf(actual) !== -1 || arrExpectedVn.indexOf(actual) !== -1;

    if (conditionArr || actual === expected) {
      dispatch(increasePoint(50));
      dispatch(actStudyCorrectDifficult(wordQuestion));
      setCountQuestion(countQuestion + 1);

      setStatus('Correct');
    } else {
      setStatus('Incorrect');
      Vibration.vibrate(200);
    }
  };
  const handleContinue = () => {
    Speech.stop();
    if (status === 'Waiting') {
      handleAnswer();
      return;
    }

    // Handle Exit Study
    if (countQuestion === totalQuestions || words.length === 0) {
      navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
      navigation.goBack();
      return;
    }

    const wordRandom = words[0];
    const newWordQuestion = status === 'Incorrect' || statusStudy ? wordQuestion : wordRandom;
    setWordQuestion(newWordQuestion);

    if (status === 'Incorrect') setStatusStudy(true);
    else setStatusStudy(false);

    setUserAnswer('');
    setStatus('Waiting');
  };

  if (!wordQuestion || !typeAnswer) return <View />;

  return (
    <View style={tailwind('w-full flex-1 justify-between')}>
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

export default TabDifficultStudy;
