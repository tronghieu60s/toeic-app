import {
  CommonAction,
  ThemeType,
  TOGGLE_EXPLAIN,
  TOGGLE_MEAN,
  TOGGLE_PRONOUNCE,
  TOGGLE_THEME,
} from '../actions/commonAction';

type CommonState = {
  theme: ThemeType;
  visibleMean: boolean;
  visibleExplain: boolean;
  visiblePronounce: boolean;
};

const commonInitialState: CommonState = {
  theme: 'light',
  visibleMean: true,
  visibleExplain: true,
  visiblePronounce: true,
};

const common = (state = commonInitialState, action: CommonAction): CommonState => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const theme: ThemeType = state.theme === 'light' ? 'dark' : 'light';
      return { ...state, theme };
    }
    case TOGGLE_MEAN: {
      return { ...state, visibleMean: !state.visibleMean };
    }
    case TOGGLE_EXPLAIN: {
      return { ...state, visibleExplain: !state.visibleExplain };
    }
    case TOGGLE_PRONOUNCE: {
      return { ...state, visiblePronounce: !state.visiblePronounce };
    }
    default:
      return state;
  }
};

export default common;
