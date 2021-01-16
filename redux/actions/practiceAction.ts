import { Dispatch } from 'react';
import { GroupType, WordType } from '~/types';
import { executeSql } from '~/utils/SQLite';

export const LOAD_WORDS_GROUP = 'LOAD_WORDS_GROUP';

export type PracticeAction = {
  type: string;
  words: WordType[];
};

export const actLoadWordsGroup = (group: GroupType) => async (
  dispatch: Dispatch<PracticeAction>,
): Promise<void> => {
  const { id_group } = group;
  const words = await executeSql('SELECT * FROM words WHERE words.id_group = ?', [id_group]);
  return dispatch(loadWordsGroup(words.data));
};

export const loadWordsGroup = (words: WordType[]): PracticeAction => ({
  type: LOAD_WORDS_GROUP,
  words,
});
