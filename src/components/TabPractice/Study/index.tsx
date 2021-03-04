import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Vibration } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/src/components/Themed';
import ProcessBar from '~/src/components/UI/ProcessBar';
import Layout from '~/src/constants/Layout';
import { shuffle } from '~/src/helpers/array';
import { convertWordsBase } from '~/src/helpers/convert';
import {
  actLoadWordsStudy,
  getPointByTypeAnswer,
  handleEndStudy,
  handleStudyCheckAnswer,
  WordStudy,
} from '~/src/helpers/study';
import {
  actStudyCorrect,
  actStudyInCorrect,
} from '~/src/redux/actions/practiceAction';
import { increasePoint, setPoint } from '~/src/redux/actions/statisticsAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { StatusQuestion, TabPracticeParamList, TypePracticeResult } from '~/types';
import ScreenLoading from '../../UI/ScreenLoading';
import AlertBottom from './Alert';
import Bottom from './Bottom';
import StudyCover from './StudyCover';
import StudyMode from './StudyMode';

const { width } = Layout.window;

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

export default memo(function TabPracticeStudy({ navigation }: Props) {
  const scroll = useRef<ScrollView>(null);
  const [isPending, setIsPending] = useState(true);
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [answer, setAnswer] = useState('');
  const [currentNum, setCurrentNum] = useState(0);
  const [countIncorrect, setCountIncorrect] = useState(0);

  const dispatch = useDispatch();
  const point = useSelector((state: RootState) => state.practice.point);
  const wordsState = useSelector((state: RootState) => state.practice.words);
  const [words, setWords] = useState<WordStudy[]>([]);

  useEffect(() => {
    dispatch(setPoint(0));
    const words = actLoadWordsStudy(wordsState);
    setWords(shuffle(words));

    setIsPending(false);
  }, []);

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
      dispatch(increasePoint(getPointByTypeAnswer(word.type)));
      dispatch(actStudyCorrect(word.data.id_word));

      setStatus('Correct');
    } else {
      setCountIncorrect(countIncorrect + 1);
      dispatch(actStudyInCorrect(word.data.id_word));
      setWords([...words, words[currentNum]]);

      setStatus('Incorrect');
      Vibration.vibrate(200);
    }
  };
  const handleContinue = (): any => {
    if (status === 'Waiting') return handleCheckAnswer();

    const wordsUnique = Array.from(new Set(words.map((item) => item.data.id_word)));
    const result: TypePracticeResult = {
      point,
      correct: words.length,
      inCorrect: countIncorrect,
      words: wordsUnique,
    };
    if (currentNum + 1 >= words.length) {
      return handleEndStudy(navigation, result);
    }

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
      <ProcessBar percent={(currentNum * 100) / words.length} />
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
