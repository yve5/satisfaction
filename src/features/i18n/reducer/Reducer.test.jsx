import reducer from './Reducer';
import { changeLang } from '../actions/All';

const frData = {
  id: 1,
  lang: 'fr',
  'Orange is a French telecommunications company.':
    'Orange est une entreprise française de télécommunications.'
};
const enData = {
  id: 2,
  lang: 'en',
  'Orange is a French telecommunications company.':
    'Orange is a French telecommunications company.'
};
const ruData = {
  id: 3,
  lang: 'ru',
  'Orange is a French telecommunications company.':
    'Оранж - французская телекоммуникационная компания.'
};

describe('The reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toHaveProperty('collection');
    expect(reducer(undefined, {})).toHaveProperty('dictionary');
  });

  it('should handle I18N_CHANGE_LANG. Part 1', () => {
    expect(
      reducer(
        {
          collection: [frData, enData, ruData],
          dictionary: frData
        },
        changeLang('en')
      )
    ).toEqual({
      type: 'I18N_CHANGE_LANG',
      collection: [frData, enData, ruData],
      dictionary: enData,
      lang: 'en'
    });
  });

  it('should handle I18N_CHANGE_LANG. Case 2', () => {
    expect(
      reducer(
        {
          collection: [frData, enData, ruData],
          dictionary: ruData
        },
        changeLang('fr')
      )
    ).toEqual({
      type: 'I18N_CHANGE_LANG',
      collection: [frData, enData, ruData],
      dictionary: frData,
      lang: 'fr'
    });
  });

  it('should handle I18N_CHANGE_LANG. Case 3', () => {
    expect(
      reducer(
        {
          collection: [frData, enData, ruData],
          dictionary: enData
        },
        changeLang('ru')
      )
    ).toEqual({
      type: 'I18N_CHANGE_LANG',
      collection: [frData, enData, ruData],
      dictionary: ruData,
      lang: 'ru'
    });
  });
});
