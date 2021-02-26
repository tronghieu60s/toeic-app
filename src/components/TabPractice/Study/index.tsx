import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, StyleSheet, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/src/components/Themed';
import ProcessBar from '~/src/components/UI/ProcessBar';
import Config from '~/src/constants/Config';
import Layout from '~/src/constants/Layout';
import { shuffle } from '~/src/helpers/array';
import { convertWordsBase, removeVietnameseTones as rmVN } from '~/src/helpers/convert';
import {
  actLoadWordsStudy,
  isTypeAnswersMean,
  isTypeAnswersName,
  WordStudy,
} from '~/src/helpers/study';
import { actStudyCorrect, increasePoint } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { StatusQuestion, TabPracticeParamList } from '~/types';
import ScreenLoading from '../../UI/ScreenLoading';
import AlertBottom from './Alert';
import Bottom from './Bottom';
import StudyCover from './StudyCover';
import StudyMode from './StudyMode';

const { width } = Layout.window;
const { total_max } = Config.study;

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const TabPracticeStudy = React.memo(({ navigation }: Props) => {
  const scroll = useRef<ScrollView>(null);
  const [isPending, setIsPending] = useState(true);
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const totalQuestions = total_max;
  const [answer, setAnswer] = useState('');
  const [currentNum, setCurrentNum] = useState(0);
  const [countIncorrect, setCountIncorrect] = useState(0);

  const dispatch = useDispatch();
  const wordsState = useSelector((state: RootState) => state.practice.words);
  const [words, setWords] = useState<WordStudy[]>([]);

  useEffect(() => {
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

  const handleSendAnswer = (value: string) => setAnswer(convertWordsBase(value));
  const handleCheckAnswer = () => {
    Keyboard.dismiss();

    let expected = '';
    const word = words[currentNum];
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
      dispatch(actStudyCorrect(word.data.id_word));

      setStatus('Correct');
    } else {
      setCountIncorrect(countIncorrect + 1);

      setStatus('Incorrect');
      Vibration.vibrate(200);
    }
  };
  const handleContinue = (): any => {
    if (status === 'Waiting') return handleCheckAnswer();
    if (currentNum + 1 >= words.length) {
      navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
      navigation.goBack();
      return Alert.alert(
        'Bạn đã hoàn thành bài học.',
        `Tổng số câu hỏi: ${total_max}\nTrả lời sai: ${countIncorrect} lần`,
      );
    }

    setAnswer('');
    setStatus('Waiting');
    setCurrentNum(currentNum + 1);
    return true;
  };

  if (isPending) return <ScreenLoading />;

  return (
    <View style={styles.container}>
      <ProcessBar percent={(currentNum * 100) / totalQuestions} />
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

export default TabPracticeStudy;
