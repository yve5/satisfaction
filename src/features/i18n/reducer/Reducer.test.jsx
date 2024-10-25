import reducer from './Reducer';
import { changeLang, initSession } from '../actions/All';

const frData = {
  id: 1,
  lang: 'fr',
  'Orange is a French telecommunications company.':
    'Orange est une entreprise française de télécommunications.',
};
const enData = {
  id: 2,
  lang: 'en',
  'Orange is a French telecommunications company.':
    'Orange is a French telecommunications company.',
};
const ruData = {
  id: 3,
  lang: 'ru',
  'Orange is a French telecommunications company.':
    'Оранж - французская телекоммуникационная компания.',
};

describe('The reducer', () => {
  const initialState = {
    collection: [frData, enData, ruData],
    dictionary: frData,
    lang: 'fr',
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toHaveProperty('collection');
    expect(reducer(undefined, {})).toHaveProperty('dictionary');
  });

  it('should handle I18N_CHANGE_LANG. en', () => {
    expect(reducer(initialState, changeLang('en'))).toEqual({
      ...initialState,
      type: 'I18N_CHANGE_LANG',
      dictionary: enData,
      lang: 'en',
    });
  });

  it('should handle I18N_CHANGE_LANG. fr', () => {
    expect(reducer(initialState, changeLang('fr'))).toEqual({
      ...initialState,
      type: 'I18N_CHANGE_LANG',
    });
  });

  it('should handle I18N_CHANGE_LANG. ru', () => {
    expect(reducer(initialState, changeLang('ru'))).toEqual({
      ...initialState,
      type: 'I18N_CHANGE_LANG',
      dictionary: ruData,
      lang: 'ru',
    });
  });
});
