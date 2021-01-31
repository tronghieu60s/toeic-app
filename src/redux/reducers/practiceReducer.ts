import { WordType } from '~/types';
import {
  INCREASE_POINT,
  LOAD_WORDS_DIFFICULT,
  LOAD_WORDS_GROUP,
  PracticeAction,
} from '../actions/practiceAction';

type PracticeState = {
  point: number;
  words: WordType[];
  wordsDifficult: WordType[];
};

const practiceInitialState: PracticeState = {
  point: 0,
  words: [],
  wordsDifficult: [],
};

const practice = (state = practiceInitialState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case LOAD_WORDS_GROUP: {
      const { words } = action;
      return { ...state, words: words || [] };
    }
    case LOAD_WORDS_DIFFICULT: {
      const { words } = action;
      return { ...state, wordsDifficult: words || [] };
    }
    case INCREASE_POINT: {
      const { point } = action;
      const newPoint = state.point + point;
      return { ...state, point: newPoint };
    }
    default:
      return state;
  }
};

export default practice;
