import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import practiceReducer from './practiceReducer';
import statisticsReducer from './statisticsReducer';

export const rootReducer = combineReducers({
  common: commonReducer,
  practice: practiceReducer,
  statistics: statisticsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
