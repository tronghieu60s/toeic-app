export const LOAD_WORDS_GROUP = 'LOAD_WORDS_GROUP';

export type PracticeAction = {
  type: string;
  group: string;
};

export const loadWordsGroup = (group: string): PracticeAction => ({
  type: LOAD_WORDS_GROUP,
  group,
});
