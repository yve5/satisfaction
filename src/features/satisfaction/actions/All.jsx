import {
  SATISFACTION_QUESTIONS,
  SATISFACTION_CHANGE_VALUE,
} from '../resources/constants';

export const changeValue = (id, value) => {
  const result = { type: SATISFACTION_CHANGE_VALUE };
  const { importance } = SATISFACTION_QUESTIONS.find(
    ({ id: ref }) => id === ref
  );
  const data = {};

  data[id] = Math.round((value / 100) * importance * 10000) / 10000;
  result.data = data;

  return result;
};
