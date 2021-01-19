import { WordType } from '~/types';
import {
  INCREASE_POINT,
  LOAD_WORDS_GROUP,
  PracticeAction,
} from '../actions/practiceAction';

type PracticeState = {
  point: number;
  words: WordType[];
};

const practiceInitialState: PracticeState = {
  point: 0,
  words: [],
};

const practice = (state = practiceInitialState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case LOAD_WORDS_GROUP: {
      const { words } = action;
      return { ...state, words: words || [] };
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
