import { jsPDF } from 'jspdf';
import { formatDate, tsl } from '../../i18n/resources/Utilities';
import {
  SATISFACTION_MESSAGES,
  SATISFACTION_QUESTIONS,
} from '../resources/constants';

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

export const print = (dictionary, data) => {
  const doc = new jsPDF();
  const factor = getFactor(data);
  const { message } = getMessage(factor);

  doc.setFontSize(24);
  doc.text(tsl(dictionary, 'Confidence factor calculation'), 19, 25);

  doc.setFontSize(9);
  doc.text(tsl(dictionary, 'Source : Brett Nelson'), 20, 31);

  doc.setFontSize(11);
  let cursor = 40;

  SATISFACTION_QUESTIONS.forEach(({ id, importance, label }) => {
    let processed = doc.splitTextToSize(tsl(dictionary, label), 160);

    doc.text(processed, 20, cursor);
    cursor += 5;

    doc.text(
      `${tsl(dictionary, 'Result')} : ${Math.round(
        (data[id] / importance) * 100
      )}%`,
      20,
      cursor
    );
    cursor += 10;
  });

  doc.setFontSize(14);
  doc.text(
    `${tsl(dictionary, 'Confidence factor')} : ${factor}%`,
    20,
    cursor + 10
  );

  doc.setFontSize(11);
  doc.text(tsl(dictionary, message), 20, cursor + 17);

  const today = formatDate(new Date(), 'yyLLdd-HHmm');

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'test') {
    doc.save(`Confidence-${today}.pdf`);
  }
};
