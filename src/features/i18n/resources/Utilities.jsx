import { format, formatDistance, parseISO } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

export const formatDate = (value, pattern = 'P', lang = 'en') => {
  const locale = lang === 'fr' ? fr : enUS;

  if (value instanceof Date) {
    if (pattern === 'fromNow') {
      return formatDistance(value, new Date(), { addSuffix: true, locale });
    }
    return format(value, pattern, { locale });
  }
  if (typeof value === 'string') {
    const stringDate = parseISO(value, 'y-MM-dd', new Date());

    if (stringDate instanceof Date && !isNaN(stringDate)) {
      if (pattern === 'fromNow') {
        return formatDistance(stringDate, new Date(), {
          addSuffix: true,
          locale,
        });
      }
      return format(stringDate, pattern, { locale });
    }
  }

  return '-';
};

export const tsl = (dictionary, text, args = {}) => {
  let result;

  if (typeof text === 'string') {
    const translated = dictionary[text];
    let isJustVariableToReplace = false;

    if (typeof args === 'object' && args !== null) {
      Object.keys(args).forEach((key) => {
        if (text === key) {
          isJustVariableToReplace = true;
        }
      });
    }

    if (isJustVariableToReplace) {
      result = text;
    } else if (typeof translated === 'undefined') {
      console.info('Not translated input:', text);
      result = text;
    } else {
      result = translated;
    }

    if (typeof args === 'object' && args !== null) {
      Object.keys(args).forEach((key) => {
        const property = args[key];

        if (
          typeof property === 'object' &&
          property !== null &&
          'date' in property
        ) {
          const { date, format, lang } = property;
          result = result.split(key).join(formatDate(date, format, lang));
        } else {
          result = result.split(key).join(property);
        }
      });
    }
  }

  return result;
};

export const checkMissingTerms = (primary, secondary) => {
  const missing = [];
  let isDuplicated;

  Object.keys(primary).forEach((propPrim) => {
    isDuplicated = false;

    Object.keys(secondary).forEach((propSec) => {
      if (propPrim === propSec) {
        isDuplicated = true;
      }
    });

    if (!isDuplicated) {
      missing.push(propPrim);
    }
  });

  Object.keys(secondary).forEach((propSec) => {
    isDuplicated = false;

    Object.keys(primary).forEach((propPrim) => {
      if (propSec === propPrim) {
        isDuplicated = true;
      }
    });

    if (!isDuplicated) {
      missing.push(propSec);
    }
  });

  return missing;
};

export const checkTermOrder = (collection) => {
  const ordered = [];
  Object.keys(collection)
    .sort((one, two) => {
      const lowerOne = one.toLowerCase();
      const lowerTwo = two.toLowerCase();

      if (lowerOne < lowerTwo) {
        return -1;
      }

      if (lowerOne > lowerTwo) {
        return 1;
      }

      if (one < two) {
        return -1;
      }

      return 1;
    })
    .map((key) => ordered.push(key));
  return ordered;
};

export const convertCollectionToArray = (collection) => {
  const array = [];
  Object.keys(collection).map((key) => array.push(key));
  return array;
};
