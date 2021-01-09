import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';

const bindMiddleware = (middleware: [ThunkMiddleware]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, bindMiddleware([thunkMiddleware]));

export default store;
