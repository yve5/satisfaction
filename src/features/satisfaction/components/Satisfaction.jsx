import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import I18n from '../../i18n';
import Question from '../nested/Question';

import { getFactor, getMessage, print } from '../resources/Utilities';
import { SATISFACTION_QUESTIONS } from '../resources/constants';
import { changeLang } from '../../i18n/actions/All';

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Satisfaction = ({
  root: {
    i18n: { dictionary, lang },
    satisfaction: { data },
  },
  changeLangProp,
}) => {
  const factor = getFactor(data);
  const { className, message } = getMessage(factor);

  useEffect(() => {
    changeLangProp();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col text-right">
          <button
            className="btn btn-light mr-2"
            data-testid="s10n-change-lang"
            onClick={() => changeLangProp(lang === 'fr' ? 'en' : 'fr')}
            type="button"
          >
            <I18n>languageId</I18n>
          </button>

          <button
            className="btn btn-light"
            data-testid="s10n-print"
            onClick={() => print(dictionary, data)}
            type="button"
          >
            <I18n>Print</I18n>
          </button>
        </div>
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

const mapDispatchToProps = (dispatch) => ({
  changeLangProp: (lang) => dispatch(changeLang(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Satisfaction);
