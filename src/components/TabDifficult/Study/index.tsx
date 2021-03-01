import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AlertBottom from '~/src/components/TabPractice/Study/Alert';
import Bottom from '~/src/components/TabPractice/Study/Bottom';
import StudyCover from '~/src/components/TabPractice/Study/StudyCover';
import StudyMode from '~/src/components/TabPractice/Study/StudyMode';
import { View } from '~/src/components/Themed';
import ProcessBar from '~/src/components/UI/ProcessBar';
import Layout from '~/src/constants/Layout';
import { shuffle } from '~/src/helpers/array';
import { convertWordsBase } from '~/src/helpers/convert';
import { actLoadWordsDifficultStudy, handleStudyCheckAnswer, WordStudy } from '~/src/helpers/study';
import { actStudyCorrectDifficult, increasePoint } from '~/src/redux/actions/practiceAction';
import { RootState } from '~/src/redux/reducers/rootReducer';
import tailwind from '~/tailwind';
import { StatusQuestion, TabDifficultParamList } from '~/types';
import { AdMobInterstitial } from '../../Ads';
import ScreenLoading from '../../UI/ScreenLoading';

const { width } = Layout.window;

type Props = {
  navigation: StackNavigationProp<TabDifficultParamList, 'TabDifficultStudy'>;
};

export default memo(function TabDifficultStudy({ navigation }: Props) {
  const scroll = useRef<ScrollView>(null);
  const [isPending, setIsPending] = useState(true);
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const [answer, setAnswer] = useState('');
  const [currentNum, setCurrentNum] = useState(0);
  const [countIncorrect, setCountIncorrect] = useState(0);

  const dispatch = useDispatch();
  const wordsState = useSelector((state: RootState) => state.practice.wordsDifficult);
  const [words, setWords] = useState<WordStudy[]>([]);

  useEffect(() => {
    const words = actLoadWordsDifficultStudy(wordsState);
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
  const handleEndStudy = async () => {
    navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
    navigation.goBack();
    await AdMobInterstitial();
  };
  const handleCheckAnswer = () => {
    Keyboard.dismiss();

    const word = words[currentNum];
    const checkEqual = handleStudyCheckAnswer({ answer, word: word.data, type: word.type });

    if (checkEqual) {
      dispatch(increasePoint(50));
      dispatch(actStudyCorrectDifficult(word.data.id_word));

      setStatus('Correct');
    } else {
      setCountIncorrect(countIncorrect + 1);
      setWords([...words, words[currentNum]]);

      setStatus('Incorrect');
      Vibration.vibrate(200);
    }
  };
  const handleContinue = (): any => {
    if (status === 'Waiting') return handleCheckAnswer();
    if (currentNum + 1 >= words.length) return handleEndStudy();

    setAnswer('');
    setStatus('Waiting');
    setCurrentNum(currentNum + 1);
    return true;
  };

  if (isPending || words.length <= 0) return <ScreenLoading />;

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
      {status !== 'Waiting' && <AlertBottom word={words[currentNum].data} status={status} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { ...tailwind('w-full flex-1 justify-between') },
});
