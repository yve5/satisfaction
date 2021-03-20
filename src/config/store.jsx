import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import createRootReducers from './reducers';
// import { LOCAL_MODE_LOGGER } from '../features/user/resources/constants';

export const getMiddlewares = (
  loggerMode = localStorage.getItem('LOCAL_MODE_LOGGER')
) => {
  const middlewares = [];
  const logger = createLogger({
    collapsed: true,
  });

  if (loggerMode === 'true') {
    middlewares.push(logger);
  }

  return middlewares;
};

const store = createStore(
  createRootReducers(history),
  compose(applyMiddleware(...getMiddlewares()))
);

export default store;
