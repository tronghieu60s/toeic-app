import _ from 'lodash';
import { WordType } from '~/types';
import { PracticeAction, LOAD_WORDS_GROUP } from '../actions/practiceAction';

type PracticeState = {
  practiceWords: WordType[];
};

const practiceInitialState: PracticeState = {
  practiceWords: [],
};

const practice = (state = practiceInitialState, action: PracticeAction): PracticeState => {
  switch (action.type) {
    case LOAD_WORDS_GROUP: {
      const allWords: WordType[] = require('~/resource/words');
      const practiceWords: WordType[] = _.filter(allWords, (o) => o.group === action.group);
      return { ...state, practiceWords };
    }
    default:
      return state;
  }
};

export default practice;
