import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'react';
import Config from '~/src/constants/Config';
import { shuffle } from '~/src/helpers/array';
import { getGroups } from '~/src/models/GroupsModel';
import { createStudies, getWordsStudied, updateStudies } from '~/src/models/StudiesModel';
import {
  getWordsByIdGroup,
  getWordsByIdWord,
  getWordsDifficult,
  getWordsNonDifficultStudied,
} from '~/src/models/WordsModel';
import { GroupType, WordType } from '~/types';

const { count_max, difficult_max, difficult_per_day } = Config.study;

export const LOAD_GROUPS = 'LOAD_GROUPS';
export const LOAD_WORDS_GROUP = 'LOAD_WORDS_GROUP';
export const LOAD_WORDS_STUDIED = 'LOAD_WORDS_STUDIED';
export const LOAD_WORD_DETAILS = 'LOAD_WORD_DETAILS';
export const LOAD_WORDS_DIFFICULT = 'LOAD_WORDS_DIFFICULT';
export const INCREASE_POINT = 'INCREASE_POINT';

export type GroupTypeRender = GroupType & { count_words: number; count_words_complete: number };

export type PracticeAction = {
  type: string;
  groups: GroupTypeRender[];
  words: WordType[];
  word: WordType;
};

export const typeDefault: PracticeAction = {
  type: '',
  groups: [],
  words: [],
  word: { id_group: 0, id_word: 0, id_study: 0 },
};

export const loadGroups = (groups: GroupTypeRender[]): PracticeAction => ({
  ...typeDefault,
  type: LOAD_GROUPS,
  groups,
});

export const loadWordsGroup = (words: WordType[]): PracticeAction => ({
  ...typeDefault,
  type: LOAD_WORDS_GROUP,
  words,
});

export const loadWordsStudied = (words: WordType[]): PracticeAction => ({
  ...typeDefault,
  type: LOAD_WORDS_STUDIED,
  words,
});

export const loadWordsDifficult = (words: WordType[]): PracticeAction => ({
  ...typeDefault,
  type: LOAD_WORDS_DIFFICULT,
  words,
});

export const loadWordDetails = (word: WordType): PracticeAction => ({
  ...typeDefault,
  type: LOAD_WORD_DETAILS,
  word,
});

// Async Await Thunk
export const actLoadGroups = () => async (dispatch: Dispatch<PracticeAction>): Promise<void> => {
  const groupsSql = await getGroups();
  if (groupsSql.data !== null) {
    const groups = groupsSql.data;
    return dispatch(loadGroups(groups));
  }
  return undefined;
};

export const actLoadWordsGroup = (group: GroupType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_group } = group;
  const words = await getWordsByIdGroup(id_group);
  return dispatch(loadWordsGroup(words.data || []));
};

export const actLoadWordsStudied = () => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const wordsStudied = await getWordsStudied();
  return dispatch(loadWordsStudied(wordsStudied.data || []));
};

// Difficult Words
export const actLoadWordsDifficult = () => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const preDateStorage = (await AsyncStorage.getItem('@previous_date_difficult')) || '0';
  const numDatePreStorage = parseInt(preDateStorage, 10);
  const now = new Date();
  const firstDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (firstDate.getTime() - numDatePreStorage >= 86400000) {
    await AsyncStorage.setItem('@previous_date_difficult', firstDate.getTime().toString());
    const wordsState = await getWordsNonDifficultStudied();
    let words: WordType[] = wordsState.data || [];
    words = shuffle(words).slice(0, difficult_per_day);

    words.map(async (word: WordType) => {
      await updateStudies({ ...word, difficult_study: 1 });
    });
  }

  const wordsDifficult = await getWordsDifficult();
  return dispatch(loadWordsDifficult(wordsDifficult.data || []));
};

export const actStudyCorrectDifficult = (id_word: number) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const wordExecute = await getWordsByIdWord(id_word);
  const word = wordExecute.data[0];
  const { difficult_study = 0 } = word;
  if (difficult_study >= difficult_max) await updateStudies({ ...word, difficult_study: 0 });
  else await updateStudies({ ...word, difficult_study: difficult_study + 1 });

  const wordsDifficult = await getWordsDifficult();
  return dispatch(loadWordsDifficult(wordsDifficult.data || []));
};

// Study Check
export const actStudyCorrect = (id_word: number) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const wordExecute = await getWordsByIdWord(id_word);
  const word = { ...wordExecute.data[0] };
  const { id_group, id_study, count_study = 0 } = word;
  if (id_study) {
    if (count_study < count_max) await updateStudies({ ...word, count_study: count_study + 1 });
  } else {
    await createStudies({ id_study: id_word, count_study: 1 });
  }

  const words = await getWordsByIdGroup(id_group);
  return dispatch(loadWordsGroup(words.data));
};

export const actStudyInCorrect = (id_word: number) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const wordExecute = await getWordsByIdWord(id_word);
  const word = wordExecute.data[0];
  const { id_group, id_study, count_study } = word;
  if (id_study && count_study >= 1) {
    await updateStudies({ ...word, difficult_study: 1 });

    const words = await getWordsByIdGroup(id_group);
    await dispatch(loadWordsGroup(words.data));
    const wordsDifficult = await getWordsDifficult();
    await dispatch(loadWordsDifficult(wordsDifficult.data || []));
  }

  return undefined;
};

// Flash Word Difficult
export const actToggleFlashWord = (word: WordType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_group, id_study, id_word, difficult_study } = word;
  if (id_study) await updateStudies({ ...word, difficult_study: difficult_study ? 0 : 1 });
  else await createStudies({ id_study: id_word, difficult_study: 1 });

  const words = await getWordsByIdGroup(id_group);
  dispatch(loadWordsGroup(words.data || []));
  const wordsDifficult = await getWordsDifficult();
  return dispatch(loadWordsDifficult(wordsDifficult.data || []));
};
