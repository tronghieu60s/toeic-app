import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { Alert, Keyboard, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import playSound, { AUDIO_CORRECT, AUDIO_FINISH, AUDIO_WRONG } from '~/helpers/sound';
import {
  actStudyCorrect,
  actStudyInCorrect,
  changeTypePractice,
  increasePoint,
} from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { StatusQuestion, TabPracticeParamList, WordQuestion, WordType } from '~/types';
import AlertUI from './AlertUI';
import BottomUI from './BottomUI';
import AssembleWords from './StudyMode/AssembleWords';
import ChooseWord from './StudyMode/ChooseWord';
import StudyUI from './StudyUI';

const totalQuestions = 5;

type Props = {
  navigation: StackNavigationProp<TabPracticeParamList, 'TabPracticeScreen'>;
};

const TabPracticeStudy = memo(({ navigation }: Props) => {
  const [status, setStatus] = useState<StatusQuestion>('Waiting');
  const [userAnswer, setUserAnswer] = useState('');
  const [countQuestion, setCountQuestion] = useState(0);

  const [typeQuestion, setTypeQuestion] = useState(0);
  const typePractice = useSelector((state: RootState) => state.practice.typePractice);

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words);
  const [wordQuestion, setWordQuestion] = useState<WordQuestion>({
    words: words[0],
    question: '',
    answer: '',
  });
  const [wordsAnswer, setWordsAnswer] = useState<WordType[]>([]);

  useEffect(() => {
    handleQuestion();

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

  const handleNextPractice = () => {
    const typeRandom = rdNum(0, 2);
    if (typeRandom === 0) dispatch(changeTypePractice('NAME-MEAN'));
    if (typeRandom === 1) dispatch(changeTypePractice('MEAN-NAME'));
  };

  const handleQuestion = () => {
    let question = '';
    let answer = '';
    let wordsAnswer: WordType[] = words;

    const random = rdNum(0, words.length);
    const wordRandom = words[random];
    if (typePractice === 'NAME-MEAN') {
      question = wordRandom.name_word || '';
      answer = wordRandom.mean_word || '';
      wordsAnswer = wordsAnswer.filter((o) => o.mean_word !== answer);
    }
    if (typePractice === 'MEAN-NAME') {
      question = wordRandom.mean_word || '';
      answer = wordRandom.name_word || '';
      wordsAnswer = wordsAnswer.filter((o) => o.name_word !== answer);
    }

    const indexRandom = rdNum(0, 4);
    // // Shuffle Array And Add Correct Value
    wordsAnswer = _.shuffle(wordsAnswer).slice(0, 5);
    wordsAnswer.splice(indexRandom, 0, wordRandom);

    setWordsAnswer(wordsAnswer);
    setWordQuestion({ words: wordRandom, question, answer });
  };

  const handleSendAnswer = (value: string) => {
    const { answer } = wordQuestion;
    const arrAnswer = answer.split(',').map((item) => item.trim().toLowerCase());
    const userAnswer = value.trim().toLowerCase();
    setUserAnswer(userAnswer);
    if (arrAnswer.indexOf(userAnswer) !== -1 || answer === userAnswer) {
      Keyboard.dismiss();
      // Handle Study Correct And Increase Point
      dispatch(increasePoint(50));
      dispatch(actStudyCorrect(wordQuestion.words));

      playSound(AUDIO_CORRECT);
      setStatus('Correct');

      setCountQuestion(countQuestion + 1);
      handleNextPractice();
    }

    if (typeQuestion === 1 && answer !== userAnswer) {
      dispatch(actStudyInCorrect(wordQuestion.words));

      Vibration.vibrate(200);
      playSound(AUDIO_WRONG);
      setStatus('Incorrect');
    }
  };

  const handleCheckAnswer = () => {
    Keyboard.dismiss();
    const { answer } = wordQuestion;
    const result = (userAnswer || '').trim().toLowerCase();
    if (answer === result) {
      // Handle Study Correct And Increase Point
      dispatch(increasePoint(50));
      dispatch(actStudyCorrect(wordQuestion.words));

      playSound(AUDIO_CORRECT);
      setStatus('Correct');
      setCountQuestion(countQuestion + 1);
    } else {
      dispatch(actStudyInCorrect(wordQuestion.words));

      Vibration.vibrate(200);
      playSound(AUDIO_WRONG);
      setStatus('Incorrect');
    }

    handleNextPractice();
  };

  const handleButtonAnswer = () => {
    if (status !== 'Waiting') {
      if (countQuestion === totalQuestions) {
        playSound(AUDIO_FINISH);
        navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
        navigation.goBack();
      }
      const typeQuestion = rdNum(0, 2);
      setTypeQuestion(typeQuestion);
      handleQuestion();
      setStatus('Waiting');
      return;
    }

    handleCheckAnswer();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <ProcessBar percent={(countQuestion * 100) / totalQuestions} />
      <StudyUI status={status} wordQuestion={wordQuestion}>
        <View>
          {typeQuestion === 0 && (
            <AssembleWords wordQuestion={wordQuestion} handleSendAnswer={handleSendAnswer} />
          )}
          {typeQuestion === 1 && (
            <ChooseWord wordsAnswer={wordsAnswer} handleSendAnswer={handleSendAnswer} />
          )}
        </View>
      </StudyUI>
      <BottomUI status={status} handleCheckAnswer={handleButtonAnswer} />
      {status !== 'Waiting' && <AlertUI status={status} wordQuestion={wordQuestion} />}
    </View>
  );
});

export default TabPracticeStudy;
