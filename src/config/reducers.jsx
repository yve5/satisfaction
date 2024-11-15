import { combineReducers } from 'redux';

import i18n from '../i18n/reducer';
import satisfaction from '../satisfaction/reducer';

const createRootReducers = () =>
  combineReducers({
    satisfaction,
    i18n,
  });

export default createRootReducers;
