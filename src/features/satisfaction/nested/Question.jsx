import React from 'react';
import { connect } from 'react-redux';

import { changeValue } from '../actions/All';
import { SATISFACTION_RANGE_STEP } from '../resources/constants';

class Question extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    const { id, changeValueProp } = this.props;
    changeValueProp(id, this.state.value);
  }

  render() {
    const { id, label, changeValueProp } = this.props;

    return (
      <div className="row mb-5 mb-md-3">
        <label className="col-9 col-md-7 form-label" htmlFor={`question-${id}`}>
          {label}
        </label>
        <div className="col-3 col-md-1 text-right">{this.state.value}%</div>
        <div className="col-md-4">
          <input
            className="form-range px-0 w-100"
            id={`question-${id}`}
            onChange={({ target: { value } }) => {
              changeValueProp(id, value);
              this.setState({ value });
            }}
            step={SATISFACTION_RANGE_STEP}
            type="range"
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  root: state,
});

const mapDispatchToProps = (dispatch) => ({
  changeValueProp: (id, value) => dispatch(changeValue(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
