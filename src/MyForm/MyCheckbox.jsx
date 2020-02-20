import React from 'react';
import { useField } from 'formik';
import { Checkbox } from 'antd';

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox" htmlFor={props.name}>
        <Checkbox {...field} {...props}>
          {children}
        </Checkbox>
      </label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export default MyCheckbox;
