import React from 'react';
import { useField } from 'formik';
import { Row, Input } from 'antd';
import PropTypes from 'prop-types';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Row className="text-input">
      <label htmlFor={props.name}>{label}</label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </Row>
  );
};

export default MyTextInput;

MyTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
