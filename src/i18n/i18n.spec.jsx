import React from 'react';
import configureMockStore from 'redux-mock-store';

import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import i18n from '.';
import en from './en';
import fr from './fr';

import {
  I18n,
  trimTerms,
  checkMissingTerms,
  checkLocalTermOrder,
  convertLocalCollection,
} from 'organe';

describe('Local i18n', () => {
  it('should detect missing terms', () => {
    expect(checkMissingTerms(en, fr)).toEqual([]);
  });

  it('should check english term order', () => {
    expect(checkLocalTermOrder(en)).toEqual(convertLocalCollection(en));
  });

  it('should check french term order', () => {
    expect(checkLocalTermOrder(fr)).toEqual(convertLocalCollection(fr));
  });

  it('should trim local dictionaries', () => {
    expect(trimTerms(en)).toEqual([]);
  });

  it('should match expected snapshot', () => {
    const mockStore = configureMockStore([thunk]);

    const { asFragment } = render(
      <Provider store={mockStore({ i18n })}>
        {['Hello World'].map((term, index) => (
          <p key={index}>
            <I18n>{term}</I18n>
          </p>
        ))}
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
