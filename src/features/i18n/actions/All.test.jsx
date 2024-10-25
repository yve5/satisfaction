import * as tools from './All';

describe('Actions', () => {
  it('should handle I18N_CHANGE_LANG', () => {
    expect(tools.changeLang(undefined)).toEqual({
      type: 'I18N_CHANGE_LANG',
      lang: 'fr',
    });

    expect(tools.changeLang('ru')).toEqual({
      type: 'I18N_CHANGE_LANG',
      lang: 'ru',
    });
  });
});
