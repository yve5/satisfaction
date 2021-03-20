import { I18N_CHANGE_LANG } from '../resources/constants';
import * as en from '../dictionaries/en';
import * as fr from '../dictionaries/fr';

const collection = [fr, en].map((language, index) => ({
  id: index + 1,
  ...language.I18N_DICTIONARY,
}));

const initialState = {
  collection,
  dictionary: collection[0],
  lang: collection[0].lang,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case I18N_CHANGE_LANG:
      return {
        ...state,
        ...action,
        dictionary: state.collection.find(({ lang }) => lang === action.lang),
      };

    default:
      return state;
  }
};

export default reducer;
