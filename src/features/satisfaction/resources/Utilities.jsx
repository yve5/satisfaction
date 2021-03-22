import { SATISFACTION_MESSAGES } from '../resources/constants';

export const getFactor = (data) => {
  let sum = 0;
  for (const prop in data) {
    sum += data[prop];
  }
  return Math.round(sum * 10000) / 100;
};

export const getMessage = (factor) => {
  if (90 < factor) {
    return SATISFACTION_MESSAGES[3];
  }

  if (75 < factor) {
    return SATISFACTION_MESSAGES[2];
  }

  if (60 < factor) {
    return SATISFACTION_MESSAGES[1];
  }

  return SATISFACTION_MESSAGES[0];
};
