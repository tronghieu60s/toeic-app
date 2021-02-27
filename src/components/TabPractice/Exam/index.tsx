import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, StyleSheet, Vibration } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/src/components/Themed';
import ProcessBar from '~/src/components/UI/ProcessBar';
import Config from '~/src/constants/Config';
import Layout from '~/src/constants/Layout';
import { shuffle } from '~/src/helpers/array';
import { convertWordsBase, removeVietnameseTones as rmVN } from '~/src/helpers/convert';
import {
  actLoadWordsExam,
  isTypeAnswersMean,
  isTypeAnswersName,
  WordStudy,
} from '~/src/helpers/study';
import { increasePoint } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { StatusQuestion, TabPracticeParamList } from '~/types';
import ScreenLoading from '../../UI/ScreenLoading';
import AlertBottom from '../Study/Alert';
import Bottom from '../Study/Bottom';
import StudyCover from '../Study/StudyCover';
import StudyMode from '../Study/StudyMode';

const { width } = Layout.window;
const { time_max } = Config.study;

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default memo(function TabPracticeExam({ navigation }: Props) {
  const totalTime = time_max; // Seconds
  const scroll = useRef<ScrollView>(null);
  const [countTime, setCountTime] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [answer, setAnswer] = useState('');
  const [currentNum, setCurrentNum] = useState(0);
  const [countCorrect, setCountCorrect] = useState(0);
  const [countIncorrect, setCountIncorrect] = useState(0);

  const dispatch = useDispatch();
  const wordsState = useSelector((state: RootState) => state.practice.words);
  const [words, setWords] = useState<WordStudy[]>([]);

  useEffect(() => {
    const processTime = setInterval(() => {
      if (countTime >= totalTime) {
        clearInterval(processTime);

        navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
        navigation.goBack();
        Alert.alert(
          'Bạn đã hoàn thành bài học.',
          `Tổng số câu hỏi: ${countCorrect + countIncorrect}\nTrả lời sai: ${countIncorrect} lần`,
        );
      } else setCountTime(countTime + 1);
    }, 1000);
    return () => clearInterval(processTime);
  });

  useEffect(() => {
    const words = actLoadWordsExam(wordsState);
    setWords(shuffle(words));

    setIsPending(false);
  }, []);

  useEffect(() => {
    scroll?.current?.scrollTo({
      x: width * currentNum,
      animated: true,
    });
  }, [currentNum]);

  const handleSendAnswer = (value: string) => setAnswer(convertWordsBase(value));
  const handleCheckAnswer = () => {
    Keyboard.dismiss();

    const word = words[currentNum];
    let expected = '';
    if (isTypeAnswersName(word.type)) expected = word.data.name_word || '';
    if (isTypeAnswersMean(word.type)) expected = word.data.mean_word || '';
    expected = convertWordsBase(expected);

    const arrExpected = expected.split(',').map((s) => convertWordsBase(s));
    const arrExpectedVn = expected.split(',').map((s) => rmVN(convertWordsBase(s)));

    const actual = convertWordsBase(answer);
    const checkEqual =
      arrExpected.indexOf(actual) !== -1 ||
      arrExpectedVn.indexOf(actual) !== -1 ||
      actual === expected;

    if (checkEqual) {
      dispatch(increasePoint(50));
      setCountCorrect(countCorrect + 1);

      setStatus('Correct');
    } else {
      setCountIncorrect(countIncorrect + 1);

      setStatus('Incorrect');
      Vibration.vibrate(200);
    }
  };
  const handleContinue = (): any => {
    if (status === 'Waiting') return handleCheckAnswer();

    setAnswer('');
    setStatus('Waiting');
    setCurrentNum(currentNum + 1);
    return true;
  };

  if (isPending || words.length <= 0) return <ScreenLoading />;

  return (
    <View style={styles.container}>
      <ProcessBar height={4} percent={(countTime * 100) / totalTime} color="#5e72e4" />
      <ScrollView
        ref={scroll}
        horizontal
        decelerationRate="fast"
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: '#f3f3f3' }}
        snapToInterval={width}
      >
        {words.map((word, index) => {
          const { data, type } = word;
          return (
            <StudyCover key={index} word={data} typeAnswer={type}>
              <StudyMode word={data} typeAnswer={type} handleSendAnswer={handleSendAnswer} />
            </StudyCover>
          );
        })}
      </ScrollView>
      <Bottom status={status} answer={answer} handleContinue={handleContinue} />
      {status !== 'Waiting' && <AlertBottom word={words[currentNum].data} status={status} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { ...tailwind('w-full flex-1 justify-between') },
});
