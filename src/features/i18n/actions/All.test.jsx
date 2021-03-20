import * as tools from './All';

describe('Actions', () => {
  it('should handle I18N_CHANGE_LANG', () => {
    expect(tools.changeLang()).toEqual({
      type: 'I18N_CHANGE_LANG'
    });
  });
});
