import { CommonAction, ThemeType, TOGGLE_MEAN, TOGGLE_PRONOUNCE, TOGGLE_THEME, TOGGLE_WORD } from '../actions/commonAction';

type CommonState = {
  theme: ThemeType;
  visibleWord: boolean;
  visibleMean: boolean;
  visiblePronounce: boolean;
};

const commonInitialState: CommonState = {
  theme: 'light',
  visibleWord: true,
  visibleMean: true,
  visiblePronounce: true,
};

const common = (state = commonInitialState, action: CommonAction): CommonState => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const theme: ThemeType = state.theme === 'light' ? 'dark' : 'light';
      return { ...state, theme };
    }
    case TOGGLE_WORD: {
      return { ...state, visibleWord: !state.visibleWord };
    }
    case TOGGLE_MEAN: {
      return { ...state, visibleMean: !state.visibleMean };
    }
    case TOGGLE_PRONOUNCE: {
      return { ...state, visiblePronounce: !state.visiblePronounce };
    }
    default:
      return state;
  }
};

export default common;
