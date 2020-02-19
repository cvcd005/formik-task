import React from 'react';

const ContentWrapper = (props) => {
  const {children} = props;
  return (
    <div className="contentWrapper">
    {children}
    </div>
  )
};

export default ContentWrapper;