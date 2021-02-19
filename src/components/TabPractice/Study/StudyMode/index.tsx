/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
import React, { memo } from 'react';
import { TypesAnswer, WordType } from '~/types';
import ChooseSound from './ChooseSound';
import ChooseWord from './ChooseWord';
import FillWord from './FillWord';

type Props = {
  word: WordType;
  typeAnswer: TypesAnswer;
  handleSendAnswer: (value: string) => void;
};

const StudyMode = memo((props: Props) => {
  const { word, typeAnswer, handleSendAnswer } = props;

  if (typeAnswer === 'CHOOSE-NAME-MEAN')
    return <ChooseWord word={word} typeAnswer={typeAnswer} handleSendAnswer={handleSendAnswer} />;

  if (typeAnswer === 'CHOOSE-MEAN-NAME')
    return <ChooseWord word={word} typeAnswer={typeAnswer} handleSendAnswer={handleSendAnswer} />;

  if (typeAnswer === 'FILL-NAME-MEAN' || typeAnswer === 'FILL-MEAN-NAME')
    return <FillWord word={word} handleSendAnswer={handleSendAnswer} />;

  if (typeAnswer === 'CHOOSE-MEAN-SOUND')
    return <ChooseSound word={word} handleSendAnswer={handleSendAnswer} />;

  if (typeAnswer === 'CHOOSE-SOUND-MEAN')
    return <ChooseWord word={word} typeAnswer={typeAnswer} handleSendAnswer={handleSendAnswer} />;

  return null;
});

export default StudyMode;
