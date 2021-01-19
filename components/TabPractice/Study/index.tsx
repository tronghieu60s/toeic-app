import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useEffect, useState } from 'react';
import { Alert, Keyboard, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/components/Themed';
import ProcessBar from '~/components/UI/ProcessBar';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import playSound, { AUDIO_CORRECT, AUDIO_FINISH, AUDIO_WRONG } from '~/helpers/sound';
import { actStudyCorrect, actStudyInCorrect, increasePoint } from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { StatusQuestion, TabPracticeParamList, WordType } from '~/types';
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
  const [typeAnswer, setTypeAnswer] = useState(0);
  const [typeQuestion, setTypeQuestion] = useState(0);
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

  const handleCheckAnswer = () => {
    if (status === 'Waiting') {
      Keyboard.dismiss();
      let answer;
      if (typeAnswer === 0) answer = wordQuestion.mean_word;
      if (typeAnswer === 1) answer = wordQuestion.name_word;

      const result = userAnswer.trim().toLowerCase();
      const arrAnswer = (answer || '').split(',').map((item) => item.trim().toLowerCase());
      if (arrAnswer.indexOf(result) !== -1 || answer === result) handleStudyCorrect();
      else handleStudyIncorrect();
    } else {
      const typeQuestion = rdNum(0, 2);
      setTypeQuestion(typeQuestion);

      if (countQuestion === totalQuestions) {
        playSound(AUDIO_FINISH);
        navigation.removeListener('beforeRemove', (e) => navigation.dispatch(e.data.action));
        navigation.goBack();
      }

      setTypeAnswer(rdNum(0, 2));
      setWordQuestion(words[rdNum(0, words.length)]);
      setStatus('Waiting');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <ProcessBar percent={(countQuestion * 100) / totalQuestions} />
      <StudyUI status={status} word={wordQuestion} typeAnswer={typeAnswer}>
        <View>
          {typeQuestion === 0 && (
            <AssembleWords word={wordQuestion} handleSendAnswer={handleSendAnswer} />
          )}
          {typeQuestion === 1 && (
            <ChooseWord
              word={wordQuestion}
              typeAnswer={typeAnswer}
              handleSendAnswer={handleSendAnswer}
            />
          )}
        </View>
      </StudyUI>
      <BottomUI status={status} handleCheckAnswer={handleCheckAnswer} />
      {status !== 'Waiting' && <AlertUI status={status} word={wordQuestion} />}
    </View>
  );
});

export default TabPracticeStudy;
