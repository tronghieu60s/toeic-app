// test

import { TypesAnswer } from '~/types';

export function typeAnswersName(type: TypesAnswer) {
  return type === 'CHOOSE-MEAN-NAME' || type === 'CHOOSE-MEAN-SOUND' || type === 'FILL-MEAN-NAME';
}

export function typeAnswersMean(type: TypesAnswer) {
  return type === 'CHOOSE-NAME-MEAN' || type === 'FILL-NAME-MEAN' || type === 'CHOOSE-SOUND-MEAN';
}
