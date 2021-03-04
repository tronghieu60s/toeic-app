import { WordType } from '~/types';
import {
  LOAD_WORDS_DIFFICULT,
  LOAD_WORDS_GROUP,
  LOAD_WORD_DETAILS,
  PracticeAction,
} from '../actions/practiceAction';

type PracticeState = {
  point: number;
  words: WordType[];
  wordDetail: WordType;
  wordsDifficult: WordType[];
};

const practiceInitialState: PracticeState = {
  point: 0,
  words: [],
  wordDetail: { id_group: 0, id_word: 0, id_study: 0 },
  wordsDifficult: [],
};

const practice = (state = practiceInitialState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case LOAD_WORDS_GROUP: {
      const { words } = action;
      return { ...state, words: words || [] };
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
