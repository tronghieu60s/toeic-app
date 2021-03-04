/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertWordsBase, removeVietnameseTones as rmVN } from '~/src/helpers/convert';
import { randomBetweenTwoNumber as rdNum } from '~/src/helpers/random';
import { TypePracticeResult, TypesAnswer, WordType } from '~/types';
import { AdMobInterstitial } from '../components/Ads';
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

export const getPointByTypeAnswer = (typeAnswer: TypesAnswer): number => {
  if (typeAnswer === 'CHOOSE-NAME-MEAN') return 1;
  if (typeAnswer === 'CHOOSE-MEAN-NAME') return 1;
  if (typeAnswer === 'CHOOSE-MEAN-SOUND') return 2;
  if (typeAnswer === 'CHOOSE-SOUND-MEAN') return 2;
  if (typeAnswer === 'FILL-MEAN-NAME') return 3;
  if (typeAnswer === 'FILL-NAME-MEAN') return 3;
  return 10;
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

export const handleEndStudy = async (
  navigation: any,
  params: TypePracticeResult,
): Promise<void> => {
  const { point } = params;
  navigation.removeListener('beforeRemove', (e: any) => navigation.dispatch(e.data.action));
  navigation.replace('TabPracticeResult', { results: params });

  const expStorage = (await AsyncStorage.getItem('@exp')) || '0';
  const exp = parseInt(expStorage, 10);
  await AsyncStorage.setItem('@exp', (exp + point).toString());

  await AdMobInterstitial();
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

const loadWordsTypeAnswerRandom = (words: WordType[]): WordStudy[] => {
  const listWords: WordStudy[] = [];
  for (let i = 0; i < words.length; i += 1) {
    const typeAnswer = getTypeAnswerRandom();
    listWords.push({ type: typeAnswer, data: words[i] });
  }
  return listWords;
};

export const actLoadWordsStudy = (words: WordType[]): WordStudy[] => {
  let wordsLoad = loadWordsStudyWithSet(words);
  wordsLoad = loadWordsStudyMaxTotal(wordsLoad);
  const wordsStudy = loadWordsTypeAnswerRandom(wordsLoad);
  return wordsStudy;
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
  return newWords;
};

export const actLoadWordsDifficultStudy = (words: WordType[]): WordStudy[] => {
  let wordsLoad = loadWordsDifficultWithSet(words);
  wordsLoad = loadWordsDifficultMaxTotal(wordsLoad);
  const wordsStudy = loadWordsTypeAnswerRandom(wordsLoad);
  return wordsStudy;
};

// Load Word Exam
export const actLoadWordsExam = (words: WordType[], numOfWords: number): WordStudy[] => {
  const listWords: WordStudy[] = [];
  for (let i = 0; i < numOfWords; i += 1) {
    const typeAnswer = getTypeAnswerRandom();
    listWords.push({ type: typeAnswer, data: words[rdNum(0, words.length)] });
  }
  return listWords;
};
