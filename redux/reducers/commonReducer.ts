import {
  CommonAction,
  ThemeType,
  TOGGLE_MEAN,
  TOGGLE_PRONOUNCE,
  TOGGLE_THEME,
} from '../actions/commonAction';

type CommonState = {
  theme: ThemeType;
  visibleMean: boolean;
  visiblePronounce: boolean;
};

const commonInitialState: CommonState = {
  theme: 'light',
  visibleMean: true,
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
    case TOGGLE_PRONOUNCE: {
      return { ...state, visiblePronounce: !state.visiblePronounce };
    }
    default:
      return state;
  }
};

export default common;
