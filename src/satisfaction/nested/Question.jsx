import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'organe/i18n';

import * as All from '../actions/All';
import { SATISFACTION_RANGE_STEP } from '../resources/constants';

const Question = ({ id, label, changeValue }) => {
  const [answer, setAnswer] = useState(0);

  useEffect(() => {
    changeValue(id, answer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="row mb-5 mb-md-3">
      <label className="col-9 col-md-7 form-label" htmlFor={`question-${id}`}>
        <I18n>{label}</I18n>
      </label>
      <div className="col-3 col-md-1 text-right">{answer}%</div>
      <div className="col-md-4">
        <input
          type="range"
          value={answer}
          id={`question-${id}`}
          step={SATISFACTION_RANGE_STEP}
          className="form-range px-0 w-100"
          onChange={({ target: { value } }) => {
            setAnswer(value);
            changeValue(id, value);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  root: state,
});

const mapDispatchToProps = {
  ...All,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
