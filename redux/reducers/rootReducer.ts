import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import practiceReducer from './practiceReducer';

export const rootReducer = combineReducers({
  common: commonReducer,
  practice: practiceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
