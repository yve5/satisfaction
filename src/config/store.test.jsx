import { getMiddlewares } from './store';

describe('store', () => {
  xit('should handle getMiddlewares. default', () => {
    expect(getMiddlewares()).toEqual([expect.any(Function), expect.any(Function)]);
  });

  xit('should handle getMiddlewares. logger', () => {
    expect(getMiddlewares('true')).toEqual([expect.any(Function), expect.any(Function), expect.any(Function)]);
  });
});
