import { CommonAction, SET_THEME, ThemeType } from '../actions/commonAction';

type CommonState = {
  theme: ThemeType;
};

const commonInitialState: CommonState = {
  theme: 'light',
};

const common = (state = commonInitialState, action: CommonAction): CommonState => {
  switch (action.type) {
    case SET_THEME: {
      const theme: ThemeType = action.theme ? action.theme : 'light';
      return { ...state, theme };
    }
    default:
      return state;
  }
};

export default common;
