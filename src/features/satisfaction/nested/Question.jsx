import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import I18n from '../../i18n';
import { changeValue } from '../actions/All';
import { SATISFACTION_RANGE_STEP } from '../resources/constants';

const Question = ({ id, label, changeValueProp }) => {
  const [answer, setAnswer] = useState(0);

  useEffect(() => {
    changeValueProp(id, answer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="row mb-5 mb-md-3">
      <label className="col-9 col-md-7 form-label" htmlFor={`question-${id}`}>
        <I18n>{label}</I18n>
      </label>
      <div className="col-3 col-md-1 text-right">{answer}%</div>
      <div className="col-md-4">
        <input
          className="form-range px-0 w-100"
          id={`question-${id}`}
          onChange={({ target: { value } }) => {
            changeValueProp(id, value);
            setAnswer(value);
          }}
          step={SATISFACTION_RANGE_STEP}
          type="range"
          value={answer}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  root: state,
});

const mapDispatchToProps = (dispatch) => ({
  changeValueProp: (id, value) => dispatch(changeValue(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
