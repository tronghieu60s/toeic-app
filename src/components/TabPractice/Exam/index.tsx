import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, StyleSheet, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AlertUI from '~/src/components/TabPractice/Study/Alert';
import Bottom from '~/src/components/TabPractice/Study/Bottom';
import StudyCover from '~/src/components/TabPractice/Study/StudyCover';
import StudyMode from '~/src/components/TabPractice/Study/StudyMode';
import { View } from '~/src/components/Themed';
import ProcessBar from '~/src/components/UI/ProcessBar';
import { convertWordsBase, removeVietnameseTones as rmVN } from '~/src/helpers/convert';
import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import { typeAnswersMean, typeAnswersName } from '~/src/helpers/type-condition';
import { increasePoint } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { StatusQuestion, TabPracticeParamList, TypesAnswer, WordType } from '~/types';
import ScreenLoading from '../../UI/ScreenLoading';

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const TabPracticeExam = React.memo(({ navigation }: Props) => {
  const totalQuestions = 30;
  const [countIncorrect, setCountIncorrect] = useState(0);
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [userAnswer, setUserAnswer] = useState('');
  const [typeAnswer, setTypeAnswer] = useState<TypesAnswer>();
  const [countQuestion, setCountQuestion] = useState(0);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words);
  const [wordsStudy, setWordsStudy] = useState<WordType[]>([]);
  const [wordQuestion, setWordQuestion] = useState<WordType>(() => words[0]);

  useEffect(() => {
    const processTime = setInterval(() => {
      if (countQuestion === totalQuestions) {
        clearInterval(processTime);

        navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
        navigation.goBack();
        Alert.alert(
          'Bạn đã hoàn thành bài học.',
          `Tổng số câu hỏi: ${totalQuestions}\nTrả lời sai: ${countIncorrect} lần`,
        );
      } else setCountQuestion(countQuestion + 1);
    }, 1000);
    return () => clearInterval(processTime);
  });

  useEffect(() => {
    const newWords = words;
    setWordQuestion(newWords[rdNum(0, newWords.length)]);
  }, []);

  useEffect(() => {
    Speech.stop();
    const newWords = words;
    setWordsStudy(newWords);
  }, [words]);

  useEffect(() => {
    if (wordQuestion === null) return;
    const rdStudy = rdNum(1, 5);
    if (rdStudy === 1) setTypeAnswer('CHOOSE-MEAN-NAME');
    if (rdStudy === 2) setTypeAnswer('CHOOSE-SOUND-MEAN');
    if (rdStudy === 3) setTypeAnswer('FILL-MEAN-NAME');
    if (rdStudy === 4) setTypeAnswer('CHOOSE-MEAN-SOUND');
    if (rdStudy === 5) setTypeAnswer('FILL-NAME-MEAN');
  }, [wordQuestion]);

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

      setStatus('Correct');
    } else {
      setCountIncorrect(countIncorrect + 1);

      setStatus('Incorrect');
      Vibration.vibrate(200);
    }
  };
  const handleContinue = () => {
    if (status === 'Waiting') {
      handleAnswer();
      return;
    }

    const wordRandom = wordsStudy[rdNum(0, wordsStudy.length)];
    setWordQuestion(wordRandom);

    setUserAnswer('');
    setStatus('Waiting');
  };

  if (wordsStudy.length === 0 || !typeAnswer) return <ScreenLoading />;

  return (
    <View style={styles.container}>
      <ProcessBar percent={(countQuestion * 100) / totalQuestions} color="#f5365c" />
      <StudyCover status={status} word={wordQuestion} typeAnswer={typeAnswer}>
        <StudyMode
          word={wordQuestion}
          typeAnswer={typeAnswer}
          handleSendAnswer={handleSendAnswer}
        />
      </StudyCover>
      <Bottom status={status} userAnswer={userAnswer} handleContinue={handleContinue} />
      {status !== 'Waiting' && <AlertUI status={status} word={wordQuestion} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { ...tailwind('w-full flex-1 justify-between') },
});

export default TabPracticeExam;
