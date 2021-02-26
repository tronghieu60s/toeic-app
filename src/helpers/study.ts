import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import { TypesAnswer, WordType } from '~/types';
import Config from '../constants/Config';
import { shuffle } from './array';

const numOfASet = 4;
const { total_max, count_max } = Config.study;

export type WordStudy = {
  type: TypesAnswer;
  data: WordType;
};

export function isTypeAnswersName(type: TypesAnswer): boolean {
  return type === 'CHOOSE-MEAN-NAME' || type === 'CHOOSE-MEAN-SOUND' || type === 'FILL-MEAN-NAME';
}

export function isTypeAnswersMean(type: TypesAnswer): boolean {
  return type === 'CHOOSE-NAME-MEAN' || type === 'CHOOSE-SOUND-MEAN' || type === 'FILL-NAME-MEAN';
}

export const getTypeAnswer = (count_study: number): TypesAnswer => {
  let typeAnswer: TypesAnswer = 'CHOOSE-NAME-MEAN';
  if (count_study === 0) typeAnswer = 'CHOOSE-NAME-MEAN';
  if (count_study === 1) typeAnswer = 'CHOOSE-MEAN-NAME';
  if (count_study === 2) typeAnswer = 'CHOOSE-SOUND-MEAN';
  if (count_study === 3) typeAnswer = 'FILL-MEAN-NAME';
  if (count_study === 4) typeAnswer = 'CHOOSE-MEAN-SOUND';
  if (count_study === 5) typeAnswer = 'FILL-NAME-MEAN';
  if (count_study > 5) {
    const rdStudy = rdNum(1, 5);
    if (rdStudy === 1) typeAnswer = 'CHOOSE-MEAN-NAME';
    if (rdStudy === 2) typeAnswer = 'CHOOSE-SOUND-MEAN';
    if (rdStudy === 3) typeAnswer = 'FILL-MEAN-NAME';
    if (rdStudy === 4) typeAnswer = 'CHOOSE-MEAN-SOUND';
    if (rdStudy === 5) typeAnswer = 'FILL-NAME-MEAN';
  }
  return typeAnswer;
};

const loadWordsStudy = (words: WordType[]): WordType[] => {
  let newWords = words
    .sort((a, b) => ((a.count_study || 0) < (b.count_study || 0) ? 1 : -1))
    .filter((o) => ((o.count_study || 0) < count_max ? o : null));
  const wordFirst = newWords.every((o) => o.count_study === null);
  if (newWords.length > 0) {
    newWords = wordFirst ? shuffle(newWords).slice(0, numOfASet) : newWords.slice(0, numOfASet);
  } else newWords = [...words];
  return newWords;
};

const loadWordsMaxTotal = (words: WordType[]): WordType[] => {
  let wordsState = [];
  if (words.length > numOfASet) {
    for (let i = 0; i < 4; i += 1) {
      wordsState.push(words[rdNum(0, words.length)]);
    }
  } else wordsState = [...words];

  let curNumWords = 0;
  const newWords: WordType[] = [];

  for (let i = 0; i < words.length; i += 1) {
    if (curNumWords >= total_max) break;

    const word = words[i];
    if ((word.count_study || 0) < 2) {
      for (let j = 0; j < 3; j += 1) {
        if (curNumWords >= total_max) break;
        newWords.push(word);
        curNumWords += 1;
      }
    } else if ((word.count_study || 0) < count_max) {
      for (let j = 0; j < count_max - (word.count_study || 0); j += 1) {
        if (curNumWords >= total_max) break;
        newWords.push(word);
        curNumWords += 1;
      }
    } else {
      for (let j = 0; j < 2; j += 1) {
        if (curNumWords >= total_max) break;
        newWords.push(word);
        curNumWords += 1;
      }
    }
  }
  return newWords;
};

const loadTypeAnswerWords = (words: WordType[]): WordStudy[] => {
  const listWords: WordStudy[] = [];
  for (let i = 0; i < words.length; i += 1) {
    const { count_study = 0 } = words[i];
    let typeAnswer = getTypeAnswer(count_study);
    if (i >= 1 && words[i].name_word === words[i - 1].name_word) {
      typeAnswer = getTypeAnswer(count_study + 1);
      if (i >= 2 && words[i].name_word === words[i - 2].name_word) {
        typeAnswer = getTypeAnswer(count_study + 2);
      }
    }
    listWords.push({ type: typeAnswer, data: words[i] });
  }
  return listWords;
};

export const actLoadWordsStudy = (words: WordType[]): WordStudy[] => {
  let wordsLoad = loadWordsStudy(words);
  wordsLoad = loadWordsMaxTotal(wordsLoad);
  const wordsStudy = loadTypeAnswerWords(wordsLoad);
  return wordsStudy;
};
