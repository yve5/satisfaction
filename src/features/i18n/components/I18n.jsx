import React from 'react';
import { connect } from 'react-redux';
import { formatDate, tsl } from '../resources/Utilities';
// import '../resources/style.scss';

class I18n extends React.Component {
  constructor() {
    super();
    this.format = this.format.bind(this);
  }

  format(value) {
    const {
      format,
      root: {
        i18n: { lang },
      },
    } = this.props;

    return formatDate(value, format, lang);
  }

  render() {
    const {
      args,
      attrs,
      children,
      date,
      root: {
        i18n: { dictionary, lang },
      },
      title,
    } = this.props;

    if ('date' in this.props) {
      return this.format(date);
    }

    if (!children) {
      return '';
    }

    const argsCopy = args || {};

    Object.keys(argsCopy).forEach((key) => {
      const property = argsCopy[key];

      if (typeof property === 'object' && property !== null && 'date' in property) {
        property.lang = lang;
      }
    });

    if (typeof children === 'string') {
      return tsl(dictionary, children, argsCopy);
    }

    if (typeof children.length !== 'undefined') {
      throw new Error('I18n can not translate several html tags in a row');
    }

    if (children.type === 'option') {
      const { value, children: label } = children.props;
      return <option value={value}>{tsl(dictionary, label, argsCopy)}</option>;
    }

    const attrsCopy = attrs || [];
    if (title) {
      attrsCopy.push('title');
    }

    if (!Array.isArray(attrsCopy) || (Array.isArray(attrsCopy) && !attrsCopy.length)) {
      throw new Error('I18n attributes are missing');
    }

    const translated = {};
    attrsCopy.forEach((element) => {
      if (typeof children.props[element] !== 'undefined') {
        translated[element] = tsl(dictionary, children.props[element], argsCopy);
      }
    });

    return <children.type {...children.props} {...translated} />;
  }
}

const mapStateToProps = (state) => ({
  root: state,
});

export default connect(mapStateToProps)(I18n);
