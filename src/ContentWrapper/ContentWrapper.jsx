import React from 'react';
import PropTypes from 'prop-types';

const ContentWrapper = props => {
  const { children } = props;
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;

ContentWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
