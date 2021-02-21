import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { memo, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/src/components/Themed';
import ProcessBar from '~/src/components/UI/ProcessBar';
import Config from '~/src/constants/Config';
import { convertWordsBase, removeVietnameseTones as rmVN } from '~/src/helpers/convert';
import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import { typeAnswersMean, typeAnswersName } from '~/src/helpers/type-condition';
import {
  actStudyCorrect,
  actStudyInCorrect,
  increasePoint,
} from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { StatusQuestion, TabPracticeParamList, TypesAnswer, WordType } from '~/types';
import Loading from '../../UI/Loading';
import Alert from './Alert';
import Bottom from './Bottom';
import StudyCover from './StudyCover';
import StudyMode from './StudyMode';
import StudyWord from './StudyMode/StudyWord';

const numOfASet = 4;
const { total_max, count_max } = Config.study;

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const loadWordsStudy = (words: WordType[]) => {
  let newWords = words
    .sort((a, b) => ((a.count_study || 0) < (b.count_study || 0) ? 1 : -1))
    .filter((o) => ((o.count_study || 0) < count_max ? o : null));
  if (newWords.length > 0) newWords = newWords.slice(0, numOfASet);
  else newWords = [...words];
  return newWords;
};

const TabPracticeStudy = memo(({ navigation }: Props) => {
  const totalQuestions = total_max;
  const [status, setStatus] = useState<StatusQuestion>('Waiting');
  const [statusStudy, setStatusStudy] = useState<boolean>(false);

  const [userAnswer, setUserAnswer] = useState('');
  const [typeAnswer, setTypeAnswer] = useState<TypesAnswer>();
  const [countQuestion, setCountQuestion] = useState(0);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words);
  const [wordsStudy, setWordsStudy] = useState<WordType[]>([]);
  const [wordQuestion, setWordQuestion] = useState<WordType>(() => words[0]);

  useEffect(() => {
    Speech.stop();
    const newWords = loadWordsStudy(words);
    setWordsStudy(newWords);

    // console.log('--- DEBUG ---');
    // newWords.map((o) => console.log(`${o.name_word} - ${o.count_study}`));
  }, [words]);

  useEffect(() => {
    if (wordQuestion === null) return;
    const { count_study = 0 } = wordQuestion;
    if (count_study === null) {
      setStatusStudy(true);
      setTypeAnswer('CHOOSE-NAME-MEAN');
    }
    if (count_study === 1) setTypeAnswer('CHOOSE-MEAN-NAME');
    if (count_study === 2) setTypeAnswer('CHOOSE-SOUND-MEAN');
    if (count_study === 3) setTypeAnswer('FILL-MEAN-NAME');
    if (count_study === 4) setTypeAnswer('CHOOSE-MEAN-SOUND');
    if (count_study === 5) setTypeAnswer('FILL-NAME-MEAN');
    if (count_study > 5) {
      const rdStudy = rdNum(1, 5);
      if (rdStudy === 1) setTypeAnswer('CHOOSE-MEAN-NAME');
      if (rdStudy === 2) setTypeAnswer('CHOOSE-SOUND-MEAN');
      if (rdStudy === 3) setTypeAnswer('FILL-MEAN-NAME');
      if (rdStudy === 4) setTypeAnswer('CHOOSE-MEAN-SOUND');
      if (rdStudy === 5) setTypeAnswer('FILL-NAME-MEAN');
    }
  }, [wordQuestion]);

  useEffect(() => {
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
      dispatch(actStudyCorrect(wordQuestion));
      setCountQuestion(countQuestion + 1);

      setStatus('Correct');
    } else {
      dispatch(actStudyInCorrect(wordQuestion));

      setStatus('Incorrect');
      Vibration.vibrate(200);
    }
  };
  const handleContinue = () => {
    if (status === 'Waiting') {
      handleAnswer();
      return;
    }

    // Handle Exit Study
    if (countQuestion === totalQuestions) {
      navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
      navigation.goBack();
      return;
    }

    const wordRandom = wordsStudy[rdNum(0, wordsStudy.length)];
    const newWordQuestion = status === 'Incorrect' || statusStudy ? wordQuestion : wordRandom;
    setWordQuestion(newWordQuestion);

    if (status === 'Incorrect') setStatusStudy(true);
    else setStatusStudy(false);

    setUserAnswer('');
    setStatus('Waiting');
  };

  if (wordsStudy.length === 0 || !typeAnswer) return <Loading />;

  return (
    <View style={styles.container}>
      <ProcessBar percent={(countQuestion * 100) / totalQuestions} />
      {statusStudy && <StudyWord word={wordQuestion} />}
      {!statusStudy && (
        <StudyCover status={status} word={wordQuestion} typeAnswer={typeAnswer}>
          <StudyMode
            word={wordQuestion}
            typeAnswer={typeAnswer}
            handleSendAnswer={handleSendAnswer}
          />
        </StudyCover>
      )}
      <Bottom status={status} userAnswer={userAnswer} handleContinue={handleContinue} />
      {status !== 'Waiting' && !statusStudy && <Alert status={status} word={wordQuestion} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { ...tailwind('w-full flex-1 justify-between') },
});

export default TabPracticeStudy;
