import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import createRootReducers from './reducers';

const store = createStore(
  createRootReducers(),
  compose(applyMiddleware(thunk))
);

export default store;
