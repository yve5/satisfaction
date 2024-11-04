import React from 'react';
import configureMockStore from 'redux-mock-store';

import { Provider } from 'react-redux';
import { act, fireEvent, render } from '@testing-library/react';

import i18n from '../../i18n';
import Question from './Question';

const mockStore = configureMockStore();

describe('Question', () => {
  it('should match expected snapshot. default', async () => {
    const { asFragment, getByTestId } = render(
      <Provider store={mockStore({ i18n })}>
        <Question
          id="culture"
          label="Do you have time for your personal projects?"
        />
      </Provider>
    );

    await act(async () => {
      fireEvent.change(getByTestId('s10n-question-range'), {
        target: { value: '75' },
      });
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
