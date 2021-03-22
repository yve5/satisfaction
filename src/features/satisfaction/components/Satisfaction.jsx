import React from 'react';
import { connect } from 'react-redux';

import Question from '../nested/Question';
import { getFactor, getMessage } from '../resources/Utilities';
import { SATISFACTION_QUESTIONS } from '../resources/constants';

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Satisfaction = ({
  root: {
    satisfaction: { data },
  },
}) => {
  const factor = getFactor(data);
  const { className, message } = getMessage(factor);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1>Calcul du facteur de confiance</h1>

          <blockquote className="blockquote">
            <footer className="blockquote-footer">Source : Brett Nelson</footer>
          </blockquote>

          {SATISFACTION_QUESTIONS.map(({ id, label, importance }) => (
            <Question id={id} importance={importance} key={id} label={label} />
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-md-7">
          <div className={`alert ${className}`} role="alert">
            {message}
          </div>
        </div>

        <div className="col-md-4 offset-md-1">
          <div className="alert alert-dark" role="alert">
            Confidence Factor : {factor}%
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
