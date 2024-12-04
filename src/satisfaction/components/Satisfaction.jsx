import React from 'react';
import { connect } from 'react-redux';
import { I18n, LangSwitch } from 'lapwing';

import Question from '../nested/Question';
import { getFactor, getMessage, print } from '../utils';
import { SATISFACTION_QUESTIONS } from '../resources/constants';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Satisfaction = ({
  root: {
    satisfaction: { data },
    i18n: { dictionary, tsl },
  },
}) => {
  const factor = getFactor(data);
  const { className, message } = getMessage(factor);

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-2">
        <LangSwitch className="btn btn-light" />

        <button
          type="button"
          className="btn btn-light"
          onClick={() => print(dictionary, data, tsl)}
        >
          <I18n>Print</I18n>
        </button>
      </div>

      <div className="row">
        <div className="col">
          <h1>
            <I18n>Confidence factor calculation</I18n>
          </h1>

          <blockquote className="blockquote">
            <footer className="blockquote-footer">
              <I18n>Source : Brett Nelson</I18n>
            </footer>
          </blockquote>

          {SATISFACTION_QUESTIONS.map(({ id, label, importance }) => (
            <Question id={id} importance={importance} key={id} label={label} />
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-md-7">
          <div className={`alert ${className}`} role="alert">
            <I18n>{message}</I18n>
          </div>
        </div>

        <div className="col-md-4 offset-md-1">
          <div className="alert alert-dark" role="alert">
            <I18n>Confidence factor</I18n> : {factor}%
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  root: state,
});

export default connect(mapStateToProps)(Satisfaction);
