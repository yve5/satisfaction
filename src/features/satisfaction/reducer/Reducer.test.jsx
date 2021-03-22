import reducer from './Reducer';

describe('The reducer', () => {
  const initialState = {
    data: {
      salary: '50',
      satisfaction: '50',
      employability: '50',
      sideproject: '50',
      culture: '50',
      health: '50',
      location: '50',
      teamwork: '50',
      outlook: '50',
      interaction: '50',
    },
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
