import React from 'react';
import configureMockStore from 'redux-mock-store';
import Satisfaction from './Satisfaction';

import { act, create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { I18N_DICTIONARY } from '../../i18n/dictionaries/fr';

const mockStore = configureMockStore();

const i18n = {
  collection: [],
  dictionary: I18N_DICTIONARY,
  lang: 'fr',
};

const satisfaction = {
  data: {},
};

describe('Satisfaction', () => {
  it('should match expected snapshot. default', () => {
    const component = create(
      <Provider store={mockStore({ i18n, satisfaction })}>
        <Satisfaction />
      </Provider>
    );

    act(() => {
      component.root
        .findByProps({ className: 'btn btn-light' })
        .props.onClick();
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot. en', () => {
    const component = create(
      <Provider
        store={mockStore({ i18n: { ...i18n, lang: 'en' }, satisfaction })}
      >
        <Satisfaction />
      </Provider>
    );

    act(() => {
      component.root
        .findByProps({ className: 'btn btn-light' })
        .props.onClick();
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
