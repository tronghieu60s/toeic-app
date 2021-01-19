import { WordType } from '~/types';
import {
  CHANGE_TYPE_PRACTICE,
  INCREASE_POINT,
  LOAD_WORDS_GROUP,
  PracticeAction,
  TypePractice,
} from '../actions/practiceAction';

type PracticeState = {
  point: number;
  words: WordType[];
  typePractice: TypePractice;
};

const practiceInitialState: PracticeState = {
  point: 0,
  words: [],
  typePractice: 'NAME-MEAN',
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
    case CHANGE_TYPE_PRACTICE: {
      const { typePractice } = action;
      return { ...state, typePractice };
    }
    default:
      return state;
  }
};

export default practice;
