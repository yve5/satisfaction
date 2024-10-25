import { I18N_CHANGE_LANG, LOCAL_USER_LANG } from '../resources/constants';

export const changeLang = (lang = localStorage.getItem(LOCAL_USER_LANG)) => {
  const result = {
    type: I18N_CHANGE_LANG,
  };

  if (lang) {
    result.lang = lang;
    localStorage.setItem(LOCAL_USER_LANG, lang);
  } else {
    result.lang = 'fr';
    localStorage.setItem(LOCAL_USER_LANG, 'fr');
  }

  return result;
};
