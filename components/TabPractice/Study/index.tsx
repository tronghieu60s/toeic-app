import React, { memo, useState } from 'react';
import { Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '~/components/Themed';
import Loading from '~/components/UI/Loading';
import ProcessBar from '~/components/UI/ProcessBar';
import { randomBetweenTwoNumber as rdNum } from '~/helpers/random';
import playSound, { AUDIO_CORRECT, AUDIO_WRONG } from '~/helpers/sound';
import { createStudies, updateStudies } from '~/models/StudiesModel';
import { actLoadWordsGroup } from '~/redux/actions/practiceAction';
import { RootState } from '~/redux/reducers/rootReducer';
import { StatusQuestion } from '~/types';
import AlertUI from './AlertUI';
import BottomUI from './BottomUI';
import AssembleWords from './StudyMode/AssembleWords';
import StudyUI from './StudyUI';

const TabPracticeStudy = memo(() => {
  const [status, setStatus] = useState<StatusQuestion>('Waiting');

  const dispatch = useDispatch();
  const words = useSelector((state: RootState) => state.practice.words);
  const [index, setIndex] = useState(() => rdNum(0, words.length));
  const [answer, setAnswer] = useState('');

  const handleSendAnswer = (value: string) => {
    const answer = value.trim().toLowerCase();
    setAnswer(answer);
  };

  const handleCheckAnswer = () => {
    const { id_group, id_word, name_word, id_study, count_study } = words[index];
    const result = (name_word || '').trim().toLowerCase();
    if (result === answer) {
      // Update Study To Database
      if (id_study) {
        if ((count_study || 0) < 2) {
          updateStudies({
            ...words[index],
            count_study: (count_study || 0) + 1,
          });
        } else updateStudies({ ...words[index], difficult_study: 0 });
      } else createStudies({ id_study: id_word, count_study: 2 });

      playSound(AUDIO_CORRECT);
      setStatus('Correct');
    } else {
      if (id_study) updateStudies({ ...words[index], difficult_study: 1 });

      playSound(AUDIO_WRONG);
      Vibration.vibrate(200);
      setStatus('Incorrect');
    }

    dispatch(actLoadWordsGroup({ id_group }));
  };

  const handleButtonAnswer = () => {
    if (status !== 'Waiting') {
      const random = rdNum(0, words.length);
      setIndex(random);
      setStatus('Waiting');
      return;
    }

    handleCheckAnswer();
  };

  if (words.length <= 0) return <Loading />;

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <ProcessBar percent={90} />
      <StudyUI words={words[index]}>
        <AssembleWords words={words[index]} handleSendAnswer={handleSendAnswer} />
        {/* <ChooseWord word={words[index]} handleSendAnswer={handleSendAnswer} /> */}
      </StudyUI>
      <BottomUI status={status} handleCheckAnswer={handleButtonAnswer} />
      {status !== 'Waiting' && <AlertUI status={status} />}
    </View>
  );
});

export default TabPracticeStudy;
