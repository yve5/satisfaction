import React from 'react';
import { connect } from 'react-redux';
import { formatDate, tsl } from '../resources/Utilities';

const I18n = ({
  args,
  attrs,
  children,
  date,
  format,
  root: {
    i18n: { dictionary, lang },
  },
  title,
}) => {
  if (typeof date !== 'undefined') {
    return formatDate(date, format, lang);
  }

  if (!children) {
    return '-';
  }

  const argsCopy = args || {};

  Object.keys(argsCopy).forEach((key) => {
    const property = argsCopy[key];

    if (
      typeof property === 'object' &&
      property !== null &&
      'date' in property
    ) {
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

  if (
    !Array.isArray(attrsCopy) ||
    (Array.isArray(attrsCopy) && !attrsCopy.length)
  ) {
    throw new Error('I18n attributes are missing');
  }

  const translated = {};
  attrsCopy.forEach((element) => {
    if (typeof children.props[element] !== 'undefined') {
      translated[element] = tsl(dictionary, children.props[element], argsCopy);
    }
  });

  return <children.type {...children.props} {...translated} />;
};

const mapStateToProps = (state) => ({
  root: state,
});

export default connect(mapStateToProps)(I18n);
