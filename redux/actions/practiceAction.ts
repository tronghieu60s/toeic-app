import { Dispatch } from 'react';
import { createStudies, updateStudies } from '~/models/StudiesModel';
import { getWordsByIdGroup, getWordsDifficult } from '~/models/WordsModel';
import { GroupType, WordType } from '~/types';

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
  const words = await getWordsByIdGroup({ id_group });
  return dispatch(loadWordsGroup(words.data || []));
};

export const actStudyCorrectDifficult = (word: WordType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { difficult_study } = word;
  if (difficult_study === 3) await updateStudies({ ...word, difficult_study: 0 });
  else await updateStudies({ ...word, difficult_study: (difficult_study || 0) + 1 });

  const wordsDifficult = await getWordsDifficult();
  return dispatch(loadWordsDifficult(wordsDifficult.data || []));
};

export const actLoadWordsDifficult = () => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const words = await getWordsDifficult();
  return dispatch(loadWordsDifficult(words.data || []));
};

export const actStudyCorrect = (word: WordType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_word, id_group, id_study, count_study } = word;
  if (id_study) {
    if ((count_study || 0) < 5) {
      await updateStudies({
        ...word,
        count_study: (count_study || 0) + 1,
      });
    } else await updateStudies({ ...word, difficult_study: 0 });
  } else await createStudies({ id_study: id_word, count_study: 1 });

  const words = await getWordsByIdGroup({ id_group });
  return dispatch(loadWordsGroup(words.data || []));
};

export const actStudyInCorrect = (word: WordType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_study, id_group, count_study } = word;
  if (id_study && (count_study || 0) >= 5) {
    await updateStudies({ ...word, difficult_study: 1 });
    const words = await getWordsByIdGroup({ id_group });
    return dispatch(loadWordsGroup(words.data || []));
  }
  return undefined;
};

export const actToggleFlashWord = (word: WordType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_group, id_study, id_word, difficult_study } = word;
  if (id_study) await updateStudies({ ...word, difficult_study: difficult_study ? 0 : 1 });
  else await createStudies({ id_study: id_word, difficult_study: 1 });

  const words = await getWordsByIdGroup({ id_group });
  dispatch(loadWordsGroup(words.data || []));
  const wordsDifficult = await getWordsDifficult();
  return dispatch(loadWordsDifficult(wordsDifficult.data || []));
};
