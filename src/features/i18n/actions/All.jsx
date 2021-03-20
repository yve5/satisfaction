import { I18N_CHANGE_LANG } from '../resources/constants';

export const changeLang = (lang) => ({
  type: I18N_CHANGE_LANG,
  lang,
});
