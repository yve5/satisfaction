import { createStore, combineReducers } from 'redux';
import { i18nReducer } from 'organe/i18n';

import i18n from '../features/i18n/reducer/Reducer';
import satisfaction from '../features/satisfaction/reducer/Reducer';

const store = createStore(
  combineReducers({
    i18nCopy: i18nReducer(),
    satisfaction,
    i18n,
  })
);

export default store;
