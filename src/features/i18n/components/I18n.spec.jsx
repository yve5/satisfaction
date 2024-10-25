import React from 'react';
import configureMockStore from 'redux-mock-store';
import I18n from './I18n';

import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { I18N_DICTIONARY } from '../dictionaries/fr';

const mockStore = configureMockStore();

const i18n = {
  collection: [],
  dictionary: {
    'John got $pineapples pineapples, $oranges bananas and $oranges oranges.':
      'John a reçu $pineapples ananas, $oranges bananes et $oranges oranges.',
    'Orange is a French telecommunications company.':
      'Orange est une entreprise française de télécommunications.',
    'Pending mode': 'Mode décision',
    'Update of $update, created at $start by $guest':
      'Mise à jour le $update, créé le $start par $guest',
  },
  lang: 'fr',
};

const store = mockStore({ i18n });

beforeEach(() => {
  console.error = jest.fn();
});

describe('I18n', () => {
  it('should match expected snapshot without props', () => {
    const component = create(
      <Provider store={store}>
        <I18n />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with a string to translate', () => {
    const component = create(
      <Provider store={store}>
        <I18n>Pending mode</I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with an option tag to translate', () => {
    const component = create(
      <Provider store={store}>
        <I18n>
          <option value="42">Pending mode</option>
        </I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should handle an error with 2 chilren', () => {
    const error = () => {
      create(
        <Provider store={store}>
          <I18n>
            <option value="42">Pending mode</option>
            <option value="42">Pending mode</option>
          </I18n>
        </Provider>
      );
    };
    expect(error).toThrow('I18n can not translate several html tags in a row');
  });

  it('should handle an error with wrong attribute type', () => {
    const error = () => {
      create(
        <Provider store={store}>
          <I18n attrs="Hello World">
            <img alt="Pending mode" src="picture" title="Pending mode" />
          </I18n>
        </Provider>
      );
    };
    expect(error).toThrow('I18n attributes are missing');
  });

  it('should handle an error with empty attribute array', () => {
    const error = () => {
      create(
        <Provider store={store}>
          <I18n attrs={[]}>
            <img alt="Pending mode" src="picture" title="Pending mode" />
          </I18n>
        </Provider>
      );
    };
    expect(error).toThrow('I18n attributes are missing');
  });

  it('should match expected snapshot with attributes', () => {
    const component = create(
      <Provider store={store}>
        <I18n attrs={['alt', 'title', 'hello']}>
          <img alt="Pending mode" src="picture" title="Pending mode" />
        </I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with title attribute shortcut', () => {
    const component = create(
      <Provider store={store}>
        <I18n title>
          <img alt="Pending mode" src="picture" title="Pending mode" />
        </I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with an option tag to translate and args', () => {
    const component = create(
      <Provider store={store}>
        <I18n args={{ $guest: 'John' }}>
          <option value="42">
            Update of $update, created at $start by $guest
          </option>
        </I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe('I18n date parser', () => {
  const dateExample = new Date(2020, 2, 14, 13, 37, 14);

  it('should match expected snapshot with date', () => {
    const component = create(
      <Provider store={store}>
        <I18n date={dateExample} />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with undefined date', () => {
    const component = create(
      <Provider store={store}>
        <I18n date={undefined} />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with date and format', () => {
    const component = create(
      <Provider store={store}>
        <I18n date={dateExample} format="PPp" />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with string, date and format', () => {
    const component = create(
      <Provider store={store}>
        <I18n date={dateExample}>Pending mode</I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with string, date and format', () => {
    const component = create(
      <Provider store={store}>
        <I18n date={dateExample}>Pending mode</I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  const startExample = new Date(2017, 4, 14, 17, 51, 31);
  const updateExample = new Date(2020, 2, 14, 13, 37, 14);

  it('should match expected snapshot with date args', () => {
    const component = create(
      <Provider store={store}>
        <I18n
          args={{
            $guest: 'Fitzgerald',
            $start: { date: startExample },
            $update: { date: updateExample },
          }}
        >
          Update of $update, created at $start by $guest
        </I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with date args', () => {
    const component = create(
      <Provider store={store}>
        <I18n
          args={{
            $guest: 'Fitzgerald',
            $start: { date: startExample },
            $update: { date: updateExample },
          }}
        >
          Update of $update, created at $start by $guest
        </I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with attributes and date args', () => {
    const component = create(
      <Provider store={store}>
        <I18n
          args={{
            $guest: 'Fitzgerald',
            $start: { date: startExample },
            $update: { date: updateExample },
          }}
          attrs={['alt', 'title', 'hello']}
        >
          <img
            alt="Pending mode"
            src="picture"
            title="Update of $update, created at $start by $guest"
          />
        </I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match expected snapshot with input tag', () => {
    const component = create(
      <Provider store={store}>
        <I18n
          args={{ $dateToUpdate: { date: startExample } }}
          attrs={['value']}
        >
          <input
            className="form-control form-control-sm"
            disabled
            type="text"
            value="$dateToUpdate"
          />
        </I18n>
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
