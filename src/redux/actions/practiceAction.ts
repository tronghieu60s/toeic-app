import { Dispatch } from 'react';
import { createStudies, updateStudies } from '~/src/models/StudiesModel';
import { getWordsByIdGroup, getWordsByIdWord, getWordsDifficult } from '~/src/models/WordsModel';
import { GroupType, WordType } from '~/types';
import Config from '~/src/constants/Config';

const { count_max, difficult_max } = Config.study;

export const LOAD_WORDS_GROUP = 'LOAD_WORDS_GROUP';
export const LOAD_WORDS_DIFFICULT = 'LOAD_WORDS_DIFFICULT';
export const INCREASE_POINT = 'INCREASE_POINT';

export type PracticeAction = {
  type: string;
  point: number;
  words: WordType[];
};

export const typeDefault: PracticeAction = {
  type: '',
  point: 0,
  words: [],
};

export const loadWordsGroup = (words: WordType[]): PracticeAction => ({
  ...typeDefault,
  type: LOAD_WORDS_GROUP,
  words,
});

export const loadWordsDifficult = (words: WordType[]): PracticeAction => ({
  ...typeDefault,
  type: LOAD_WORDS_DIFFICULT,
  words,
});

export const increasePoint = (point: number): PracticeAction => ({
  ...typeDefault,
  type: INCREASE_POINT,
  point,
});

// Async Await Thunk
export const actLoadWordsGroup = (group: GroupType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_group } = group;
  const words = await getWordsByIdGroup(id_group);
  return dispatch(loadWordsGroup(words.data || []));
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

export const actLoadWordsDifficult = () => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const words = await getWordsDifficult();
  return dispatch(loadWordsDifficult(words.data || []));
};

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
