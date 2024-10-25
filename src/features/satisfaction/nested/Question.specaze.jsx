import React from 'react';
import configureMockStore from 'redux-mock-store';
import Question from './Question';

import { act, create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { I18N_DICTIONARY } from '../../i18n/dictionaries/fr';

const mockStore = configureMockStore();

const i18n = {
  collection: [],
  dictionary: I18N_DICTIONARY,
  lang: 'fr',
};

describe('Question', () => {
  it('should match expected snapshot. default', () => {
    const component = create(
      <Provider store={mockStore({ i18n })}>
        <Question
          id="culture"
          label="Do you have time for your personal projects?"
        />
      </Provider>
    );

    act(() => {
      component.root
        .findByProps({ className: 'form-range px-0 w-100' })
        .props.onChange({ target: { value: '75' } });
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
