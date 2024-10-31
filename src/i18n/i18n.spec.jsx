import React from 'react';
import configureMockStore from 'redux-mock-store';

import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// import i18n from '.';
// import en from './en';
// import fr from './fr';

// import { I18n } from 'organe/i18n';

// import { I18n } from '../shared/i18n';
// import {
//   trim,
//   checkMissingTerms,
//   checkLocalTermOrder,
//   convertLocalCollection,
// } from '../shared/i18n/utils';

// describe('Local i18n', () => {
//   it('should translate', () => {
//     expect(i18n.tsl('Hello World')).toEqual('Bonjour le monde');
//   });

//   it('should detect missing terms', () => {
//     expect(checkMissingTerms(en, fr)).toEqual([]);
//   });

//   it('should check english term order', () => {
//     expect(checkLocalTermOrder(en)).toEqual(convertLocalCollection(en));
//   });

//   it('should check french term order', () => {
//     expect(checkLocalTermOrder(fr)).toEqual(convertLocalCollection(fr));
//   });

//   it('should trim local dictionaries', () => {
//     expect(trim(en)).toEqual([]);
//   });

//   it('should match expected snapshot', () => {
//     const mockStore = configureMockStore([thunk]);

//     const { asFragment } = render(
//       <Provider store={mockStore({ i18n })}>
//         {[
//           'Changes have been saved.',
//           'The request has been sent successfully.',
//           'An error has been detected. Please try again.',
//         ].map((term, index) => (
//           <p key={index}>
//             <I18n>{term}</I18n>
//           </p>
//         ))}
//       </Provider>
//     );

//     expect(asFragment()).toMatchSnapshot();
//   });
// });
