import { Dispatch } from 'react';
import { createStudies, updateStudies } from '~/models/StudiesModel';
import { getWordsByIdGroup } from '~/models/WordsModel';
import { GroupType, WordType } from '~/types';

export const LOAD_WORDS_GROUP = 'LOAD_WORDS_GROUP';

export type PracticeAction = {
  type: string;
  words: WordType[];
};

export const typeDefault: PracticeAction = {
  type: '',
  words: [],
};

export const actLoadWordsGroup = (group: GroupType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_group } = group;
  const words = await getWordsByIdGroup({ id_group });
  return dispatch(loadWordsGroup(words.data || []));
};

export const actStudyCorrect = (word: WordType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_word, id_group, id_study, count_study } = word;
  if (id_study) {
    if ((count_study || 0) < 2) {
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
  const { id_study, id_group } = word;
  if (id_study) {
    await updateStudies({ ...word, difficult_study: 1 });
    const words = await getWordsByIdGroup({ id_group });
    return dispatch(loadWordsGroup(words.data || []));
  }
  return undefined;
};

export const actFlashWord = (word: WordType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_group, id_study, id_word, difficult_study } = word;
  if (id_study) await updateStudies({ ...word, difficult_study: difficult_study ? 0 : 1 });
  else await createStudies({ id_study: id_word, difficult_study: 1 });

  const words = await getWordsByIdGroup({ id_group });
  return dispatch(loadWordsGroup(words.data || []));
};

export const loadWordsGroup = (words: WordType[]): PracticeAction => ({
  ...typeDefault,
  type: LOAD_WORDS_GROUP,
  words,
});
