import { WordType } from '~/types';
import {
  GroupTypeRender,
  LOAD_GROUPS,
  LOAD_WORDS_DIFFICULT,
  LOAD_WORDS_GROUP,
  LOAD_WORDS_STUDIED,
  LOAD_WORD_DETAILS,
  PracticeAction,
} from '../actions/practiceAction';

type PracticeState = {
  groups: GroupTypeRender[];
  words: WordType[];
  wordsStudied: WordType[];
  wordDetail: WordType;
  wordsDifficult: WordType[];
};

const practiceInitialState: PracticeState = {
  groups: [],
  words: [],
  wordsStudied: [],
  wordDetail: { id_group: 0, id_word: 0, id_study: 0 },
  wordsDifficult: [],
};

const practice = (state = practiceInitialState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const { groups } = action;
      return { ...state, groups: groups || [] };
    }
    case LOAD_WORDS_GROUP: {
      const { words } = action;
      return { ...state, words: words || [] };
    }
    case LOAD_WORDS_STUDIED: {
      const { words } = action;
      return { ...state, wordsStudied: words || [] };
    }
    case LOAD_WORD_DETAILS: {
      const { word } = action;
      return { ...state, wordDetail: word };
    }
    case LOAD_WORDS_DIFFICULT: {
      const { words } = action;
      return { ...state, wordsDifficult: words || [] };
    }
    default:
      return state;
  }
};

export default practice;
