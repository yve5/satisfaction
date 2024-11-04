import React from 'react';
import configureMockStore from 'redux-mock-store';

import { createRoot } from 'react-dom/client';
import { Provider, ReactReduxContext } from 'react-redux';
import { act, fireEvent, render } from '@testing-library/react';

import i18n from '../../i18n';
import store from '../../config/store';
import Satisfaction from './Satisfaction';

const mockStore = configureMockStore();

describe('Satisfaction', () => {
  it('should render without crashing', async () => {
    const root = createRoot(document.createElement('div'));

    await act(async () => {
      root.render(
        <Provider store={store}>
          <Satisfaction context={ReactReduxContext} />
        </Provider>
      );
    });

    await act(async () => {
      root.unmount();
    });
  });

  it('should match expected snapshot. default', async () => {
    const { asFragment, getByText } = render(
      <Provider store={mockStore({ i18n, satisfaction: { data: {} } })}>
        <Satisfaction />
      </Provider>
    );

    await act(async () => {
      fireEvent.click(getByText('Impression'));
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
