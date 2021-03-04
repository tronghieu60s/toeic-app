import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Vibration } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/src/components/Themed';
import ProcessBar from '~/src/components/UI/ProcessBar';
import Config from '~/src/constants/Config';
import Layout from '~/src/constants/Layout';
import { shuffle } from '~/src/helpers/array';
import { convertWordsBase } from '~/src/helpers/convert';
import {
  actLoadWordsExam,
  getPointByTypeAnswer,
  handleEndStudy,
  handleStudyCheckAnswer,
  WordStudy,
} from '~/src/helpers/study';
import { actIncreasePoint, setPoint } from '~/src/redux/actions/statisticsAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { StatusQuestion, TabPracticeParamList, TypePracticeResult } from '~/types';
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
  const point = useSelector((state: RootState) => state.statistics.point);
  const wordsState = useSelector((state: RootState) => state.practice.words);
  const [words, setWords] = useState<WordStudy[]>([]);

  useEffect(() => {
    const processTime = setInterval(() => {
      if (countTime >= totalTime) {
        clearInterval(processTime);

        const wordsUnique = Array.from(new Set(words.map((item) => item.data.id_word)));
        const result: TypePracticeResult = {
          point,
          correct: countCorrect,
          inCorrect: countIncorrect,
          words: wordsUnique,
        };
        handleEndStudy(navigation, result);
      } else setCountTime(countTime + 1);
    }, 1000);
    return () => clearInterval(processTime);
  });

  useEffect(() => {
    dispatch(setPoint(0));
    const words = actLoadWordsExam(wordsState, 3);
    setWords(shuffle(words));

    setIsPending(false);
  }, []);

  useEffect(() => {
    if (words.length - currentNum === 1) {
      const loadWords = actLoadWordsExam(wordsState, 3);
      const newWords = [...words, ...shuffle(loadWords)];
      setWords(newWords);
    }
  }, [countCorrect, countIncorrect]);

  useEffect(() => {
    scroll?.current?.scrollTo({
      x: width * currentNum,
      animated: true,
    });
  }, [currentNum]);

  if (isPending || words.length <= 0) return <ScreenLoading />;

  const handleCheckAnswer = () => {
    Keyboard.dismiss();

    const word = words[currentNum];
    const checkEqual = handleStudyCheckAnswer({ answer, word: word.data, type: word.type });

    if (checkEqual) {
      dispatch(actIncreasePoint(getPointByTypeAnswer(word.type)));
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

  const handleSendAnswer = (value: string) => setAnswer(convertWordsBase(value));
  const onPressReport = () => {
    navigation.navigate('TabPracticeReport', { word: words[currentNum].data });
  };

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
      {status !== 'Waiting' && (
        <AlertBottom word={words[currentNum].data} status={status} onPressReport={onPressReport} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { ...tailwind('w-full flex-1 justify-between') },
});
