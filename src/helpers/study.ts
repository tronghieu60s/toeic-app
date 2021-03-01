import { convertWordsBase, removeVietnameseTones as rmVN } from '~/src/helpers/convert';
import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import { TypesAnswer, WordType } from '~/types';
import Config from '../constants/Config';
import { shuffle } from './array';

const numOfASet = 4;
const { total_max, count_max, difficult_max } = Config.study;

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

export const getTypeAnswerRandom = (): TypesAnswer => {
  let typeAnswer: TypesAnswer = 'CHOOSE-NAME-MEAN';
  const rdStudy = rdNum(0, 5);
  if (rdStudy === 0) typeAnswer = 'CHOOSE-NAME-MEAN';
  if (rdStudy === 1) typeAnswer = 'CHOOSE-MEAN-NAME';
  if (rdStudy === 2) typeAnswer = 'CHOOSE-SOUND-MEAN';
  if (rdStudy === 3) typeAnswer = 'FILL-MEAN-NAME';
  if (rdStudy === 4) typeAnswer = 'FILL-NAME-MEAN';
  if (rdStudy === 5) typeAnswer = 'CHOOSE-MEAN-SOUND';
  return typeAnswer;
};

export const getTypeAnswer = (count_study: number): TypesAnswer => {
  let typeAnswer: TypesAnswer = 'CHOOSE-NAME-MEAN';
  if (count_study === 0) typeAnswer = 'CHOOSE-NAME-MEAN';
  if (count_study === 1) typeAnswer = 'CHOOSE-MEAN-NAME';
  if (count_study === 2) typeAnswer = 'CHOOSE-SOUND-MEAN';
  if (count_study === 3) typeAnswer = 'FILL-MEAN-NAME';
  if (count_study === 4) typeAnswer = 'FILL-NAME-MEAN';
  if (count_study === 5) typeAnswer = 'CHOOSE-MEAN-SOUND';
  if (count_study > 5) typeAnswer = getTypeAnswerRandom();
  return typeAnswer;
};

export const handleStudyCheckAnswer = (props: {
  answer: string;
  word: WordType;
  type: TypesAnswer;
}): boolean => {
  const { answer, word, type } = props;
  let expected = '';
  if (isTypeAnswersName(type)) expected = word.name_word || '';
  if (isTypeAnswersMean(type)) expected = word.mean_word || '';
  expected = convertWordsBase(expected);

  const arrExpected = expected.split(',').map((s) => convertWordsBase(s));
  const arrExpectedVn = expected.split(',').map((s) => rmVN(convertWordsBase(s)));

  const actual = convertWordsBase(answer);
  const checkEqual =
    arrExpected.indexOf(actual) !== -1 ||
    arrExpectedVn.indexOf(actual) !== -1 ||
    actual === expected;
  return checkEqual;
};

// Load Words Study

const loadWordsStudyWithSet = (words: WordType[]): WordType[] => {
  let newWords = words
    .sort((a, b) => ((a.count_study || 0) < (b.count_study || 0) ? 1 : -1))
    .filter((o) => ((o.count_study || 0) < count_max ? o : null));
  const wordFirst = newWords.every((o) => o.count_study === null);
  if (newWords.length > 0) {
    newWords = wordFirst ? shuffle(newWords).slice(0, numOfASet) : newWords.slice(0, numOfASet);
  } else newWords = [...words];
  return newWords;
};

const loadWordsStudyMaxTotal = (words: WordType[]): WordType[] => {
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

const loadWordsStudyTypeAnswerWords = (words: WordType[]): WordStudy[] => {
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
  let wordsLoad = loadWordsStudyWithSet(words);
  wordsLoad = loadWordsStudyMaxTotal(wordsLoad);
  const wordsStudy = loadWordsStudyTypeAnswerWords(wordsLoad);
  return wordsStudy;
};

export const actLoadWordsExam = (words: WordType[]): WordStudy[] => {
  console.log('test');
  return null;
};

// Load Words Difficult
// console.log('---- List ----');
// wordsStudy.map((o) => console.log(`${o.data.name_word} - ${o.type}`));

const loadWordsDifficultWithSet = (words: WordType[]): WordType[] => {
  let newWords = words.sort((a, b) => {
    return (a.difficult_study || 1) < (b.difficult_study || 1) ? 1 : -1;
  });
  const wordFirst = newWords.every((o) => o.difficult_study === 1);
  newWords = wordFirst ? shuffle(newWords).slice(0, numOfASet) : newWords.slice(0, numOfASet);
  return newWords;
};

const loadWordsDifficultMaxTotal = (words: WordType[]): WordType[] => {
  let curNumWords = 0;
  const newWords: WordType[] = [];

  for (let i = 0; i < words.length; i += 1) {
    if (curNumWords >= total_max) break;

    const word = words[i];
    if ((word.difficult_study || 1) <= difficult_max) {
      for (let j = 0; j <= difficult_max - (word.difficult_study || 1); j += 1) {
        if (curNumWords >= total_max) break;
        newWords.push(word);
        curNumWords += 1;
      }
    }
  }
  console.log(newWords.length);
  return newWords;
};

const loadWordsDifficultTypeAnswerWords = (words: WordType[]): WordStudy[] => {
  const listWords: WordStudy[] = [];
  for (let i = 0; i < words.length; i += 1) {
    const typeAnswer = getTypeAnswerRandom();
    listWords.push({ type: typeAnswer, data: words[i] });
  }
  return listWords;
};

export const actLoadWordsDifficultStudy = (words: WordType[]): WordStudy[] => {
  let wordsLoad = loadWordsDifficultWithSet(words);
  wordsLoad = loadWordsDifficultMaxTotal(wordsLoad);
  const wordsStudy = loadWordsDifficultTypeAnswerWords(wordsLoad);
  // console.log('---- List ----');
  // wordsStudy.map((o) => console.log(`${o.data.name_word} - ${o.data.difficult_study}`));
  return wordsStudy;
};
