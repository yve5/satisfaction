import * as tools from './Utilities';
import { I18N_DICTIONARY as en } from '../dictionaries/en';
import { I18N_DICTIONARY as fr } from '../dictionaries/fr';

const dictionaryEn = {
  'John got $pineapples pineapples, $oranges bananas and $oranges oranges.':
    'John got $pineapples pineapples, $oranges bananas and $oranges oranges.',
  'Orange is a French telecommunications company.':
    'Orange is a French telecommunications company.',
  'Update of $update, created at $start by $guest':
    'Update of $update, created at $start by $guest',
};

const dictionaryFr = {
  'John got $pineapples pineapples, $oranges bananas and $oranges oranges.':
    'John a reçu $pineapples ananas, $oranges bananes et $oranges oranges.',
  'Orange is a French telecommunications company.':
    'Orange est une entreprise française de télécommunications.',
  'Update of $update, created at $start by $guest':
    'Mise à jour le $update, créé le $start par $guest',
};

beforeEach(() => {
  console.info = jest.fn();
});

describe('tsl', () => {
  it('should translate undefined', () => {
    expect(tools.tsl(dictionaryFr, undefined)).toEqual(undefined);
  });

  it('should translate non-string content', () => {
    expect(tools.tsl(dictionaryFr, [1, 2, 3])).toEqual(undefined);
  });

  it(`should translate ''`, () => {
    expect(tools.tsl(dictionaryFr, '')).toEqual('');
  });

  it(`should translate ' '`, () => {
    expect(tools.tsl(dictionaryFr, ' ')).toEqual(' ');
  });

  it('should translate non-translated text', () => {
    expect(tools.tsl(dictionaryFr, 'Orange is a French company.')).toEqual(
      'Orange is a French company.'
    );
  });

  it('should translate translated text', () => {
    expect(
      tools.tsl(dictionaryFr, 'Orange is a French telecommunications company.')
    ).toEqual('Orange est une entreprise française de télécommunications.');
  });

  it('should handle text with args in text, but not in params', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'John got $pineapples pineapples, $oranges bananas and $oranges oranges.'
      )
    ).toEqual(
      'John a reçu $pineapples ananas, $oranges bananes et $oranges oranges.'
    );
  });

  it('should handle text with args in params, but not in text', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'Orange is a French telecommunications company.',
        { $oranges: 7 }
      )
    ).toEqual('Orange est une entreprise française de télécommunications.');
  });

  it('should handle text with args', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'John got $pineapples pineapples, $oranges bananas and $oranges oranges.',
        {
          $oranges: 7,
        }
      )
    ).toEqual('John a reçu $pineapples ananas, 7 bananes et 7 oranges.');
  });

  it('should handle text with args. 2 args', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'John got $pineapples pineapples, $oranges bananas and $oranges oranges.',
        {
          $oranges: 17,
          $pineapples: 3,
        }
      )
    ).toEqual('John a reçu 3 ananas, 17 bananes et 17 oranges.');
  });

  it('should handle untranslated text with args', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'ROBERT got $pineapples pineapples, $oranges bananas and $oranges oranges.',
        {
          $oranges: 17,
          $pineapples: 42,
        }
      )
    ).toEqual('ROBERT got 42 pineapples, 17 bananas and 17 oranges.');
  });

  it('should handle text with non-object args', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'John got $pineapples pineapples, $oranges bananas and $oranges oranges.',
        'Hello World'
      )
    ).toEqual(
      'John a reçu $pineapples ananas, $oranges bananes et $oranges oranges.'
    );
  });

  const startExample = new Date(2017, 4, 14, 17, 51, 31);
  const updateExample = new Date(2020, 2, 14, 13, 37, 14);

  it('should handle untranslated text with date args', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'Update of $update, created at $start by $guest',
        {
          $guest: 'John',
          $update: { date: updateExample },
        }
      )
    ).toEqual('Mise à jour le 03/14/2020, créé le $start par John');
  });

  it('should handle untranslated text with date and format args', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'Update of $update, created at $start by $guest',
        {
          $guest: 'John',
          $update: { date: updateExample, format: 'PP' },
        }
      )
    ).toEqual('Mise à jour le Mar 14, 2020, créé le $start par John');
  });

  it('should handle untranslated text with date, format and lang args', () => {
    expect(
      tools.tsl(
        dictionaryFr,
        'Update of $update, created at $start by $guest',
        {
          $guest: 'John',
          $update: { date: updateExample, format: 'PP', lang: 'fr' },
          $start: { date: startExample, format: 'Pp', lang: 'fr' },
        }
      )
    ).toEqual(
      'Mise à jour le 14 mars 2020, créé le 14/05/2017, 17:51 par John'
    );
  });

  it('should handle untranslated text with date, format and lang args', () => {
    expect(
      tools.tsl(dictionaryFr, '$dateToUpdate', {
        $guest: 'John',
        $dateToUpdate: { date: updateExample, format: 'Pp', lang: 'fr' },
        $start: { date: startExample, format: 'Pp', lang: 'fr' },
      })
    ).toEqual('14/03/2020, 13:37');
  });
});

describe('checkMissigTerms', () => {
  it('should detect fake missing terms', () => {
    expect(tools.checkMissingTerms(dictionaryEn, dictionaryFr)).toEqual([]);

    expect(
      tools.checkMissingTerms(
        { Actions: 'Actions', ...dictionaryEn, Assistance: 'Assistance' },
        dictionaryFr
      )
    ).toEqual(['Actions', 'Assistance']);

    expect(
      tools.checkMissingTerms(
        { ...dictionaryEn, ID: 'ID' },
        { ...dictionaryFr, Assistance: 'Assistance', Actions: 'Actions' }
      )
    ).toEqual(['ID', 'Assistance', 'Actions']);

    expect(
      tools.checkMissingTerms(
        { ...dictionaryEn },
        { ...dictionaryFr, ID: 'ID' }
      )
    ).toEqual(['ID']);
  });

  it('should detect missing terms', () => {
    expect(tools.checkMissingTerms(en, fr)).toEqual([]);
  });
});

describe('checkTermOrder', () => {
  it('should check fake term order', () => {
    expect(tools.checkTermOrder(dictionaryEn)).toEqual(
      tools.convertCollectionToArray(dictionaryEn)
    );

    expect(tools.checkTermOrder(dictionaryFr)).toEqual(
      tools.convertCollectionToArray(dictionaryFr)
    );

    expect(
      tools.checkTermOrder({
        ID: 'ID',
        Actions: 'Actions',
        ...dictionaryEn,
        Assistance: 'Assistance',
        add: 'add',
        Add: 'Add',
      })
    ).toEqual([
      'Actions',
      'Add',
      'add',
      'Assistance',
      'ID',
      ...tools.convertCollectionToArray(dictionaryEn),
    ]);

    expect(
      tools.checkTermOrder({
        ID: 'ID',
        Actions: 'Actions',
        ...dictionaryFr,
        Zip: 'Zip',
        Add: 'Add',
        add: 'add',
      })
    ).toEqual([
      'Actions',
      'Add',
      'add',
      'ID',
      ...tools.convertCollectionToArray(dictionaryFr),
      'Zip',
    ]);
  });

  it('should check term order', () => {
    expect(tools.checkTermOrder(en)).toEqual(
      tools.convertCollectionToArray(en)
    );
    expect(tools.checkTermOrder(fr)).toEqual(
      tools.convertCollectionToArray(fr)
    );
  });
});

describe('formatDate', () => {
  it('should handle a wrong date', () => {
    expect(tools.formatDate('')).toEqual('-');
    expect(tools.formatDate(null)).toEqual('-');
    expect(tools.formatDate(undefined)).toEqual('-');
  });

  const example = new Date(2020, 2, 14, 13, 37, 14);

  it('should handle a plain date', () => {
    expect(tools.formatDate(example)).toEqual('03/14/2020');
    expect(tools.formatDate(example, 'PP')).toEqual('Mar 14, 2020');
    expect(tools.formatDate(example, 'PPp')).toEqual('Mar 14, 2020, 1:37 PM');
    expect(tools.formatDate(example, 'Pp')).toEqual('03/14/2020, 1:37 PM');
    expect(tools.formatDate(example, 'y')).toEqual('2020');
    expect(tools.formatDate(example, 'fromNow')).toMatch(/(ago)/i);
  });

  it('should handle a plain date in french', () => {
    expect(tools.formatDate(example, 'P', 'fr')).toEqual('14/03/2020');
    expect(tools.formatDate(example, 'PP', 'fr')).toEqual('14 mars 2020');
    expect(tools.formatDate(example, 'PPp', 'fr')).toEqual(
      '14 mars 2020, 13:37'
    );
    expect(tools.formatDate(example, 'Pp', 'fr')).toEqual('14/03/2020, 13:37');
    expect(tools.formatDate(example, 'y', 'fr')).toEqual('2020');
    expect(tools.formatDate(example, 'fromNow', 'fr')).toMatch(/(il y a)/i);
  });

  const stringDate = '2019-09-10';

  it('should handle a string date', () => {
    expect(tools.formatDate(stringDate)).toEqual('09/10/2019');
    expect(tools.formatDate(stringDate, 'PP')).toEqual('Sep 10, 2019');
    expect(tools.formatDate(stringDate, 'PPp')).toEqual(
      'Sep 10, 2019, 12:00 AM'
    );
    expect(tools.formatDate(stringDate, 'Pp')).toEqual('09/10/2019, 12:00 AM');
    expect(tools.formatDate(stringDate, 'y')).toEqual('2019');
    expect(tools.formatDate(stringDate, 'fromNow')).toMatch(/(ago)/i);
  });

  it('should handle a string date in french', () => {
    expect(tools.formatDate(stringDate, 'P', 'fr')).toEqual('10/09/2019');
    expect(tools.formatDate(stringDate, 'PP', 'fr')).toEqual('10 sept. 2019');
    expect(tools.formatDate(stringDate, 'PPp', 'fr')).toEqual(
      '10 sept. 2019, 00:00'
    );
    expect(tools.formatDate(stringDate, 'Pp', 'fr')).toEqual(
      '10/09/2019, 00:00'
    );
    expect(tools.formatDate(stringDate, 'y', 'fr')).toEqual('2019');
    expect(tools.formatDate(stringDate, 'fromNow', 'fr')).toMatch(/(il y a)/i);
  });

  const stringDatetime = '2020-01-13 12:44:32';

  it('should handle a string datetime', () => {
    expect(tools.formatDate(stringDatetime)).toEqual('01/13/2020');
    expect(tools.formatDate(stringDatetime, 'PP')).toEqual('Jan 13, 2020');
    expect(tools.formatDate(stringDatetime, 'PPp')).toEqual(
      'Jan 13, 2020, 12:44 PM'
    );
    expect(tools.formatDate(stringDatetime, 'Pp')).toEqual(
      '01/13/2020, 12:44 PM'
    );
    expect(tools.formatDate(stringDatetime, 'y')).toEqual('2020');
    expect(tools.formatDate(stringDatetime, 'fromNow')).toMatch(/(ago)/i);
  });

  it('should handle a string datetime in french', () => {
    expect(tools.formatDate(stringDatetime, 'P', 'fr')).toEqual('13/01/2020');
    expect(tools.formatDate(stringDatetime, 'PP', 'fr')).toEqual(
      '13 janv. 2020'
    );
    expect(tools.formatDate(stringDatetime, 'PPp', 'fr')).toEqual(
      '13 janv. 2020, 12:44'
    );
    expect(tools.formatDate(stringDatetime, 'Pp', 'fr')).toEqual(
      '13/01/2020, 12:44'
    );
    expect(tools.formatDate(stringDatetime, 'y', 'fr')).toEqual('2020');
    expect(tools.formatDate(stringDatetime, 'fromNow', 'fr')).toMatch(
      /(il y a)/i
    );
  });
});
