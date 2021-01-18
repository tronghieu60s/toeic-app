import { WordType } from '~/types';
import { LOAD_WORDS_GROUP, PracticeAction } from '../actions/practiceAction';

type PracticeState = {
  words: WordType[];
};

const practiceInitialState: PracticeState = {
  words: [],
};

const practice = (state = practiceInitialState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case LOAD_WORDS_GROUP: {
      const { words } = action;
      return { ...state, words: words || [] };
    }
    default:
      return state;
  }
};

export default practice;
