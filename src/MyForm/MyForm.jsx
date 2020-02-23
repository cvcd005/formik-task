import React from 'react';
import { Col, Button, Spin } from 'antd';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import signUp from '../Api/Api';

import MyTextInput from './MyTextInput';
import MyCheckbox from './MyCheckbox';

const Schema = require('../Api/ValidSchema'); //такой импорт так как нужен для импорта старой ноды

const SubmitForm = async (values, { setSubmitting, resetForm, setFieldError }) => {
  try {
    await signUp(values);
    resetForm();
    setSubmitting(false);
  } catch (error) {
    if (error.response.data === 'USER_EXIST') {
      setFieldError('email', 'User with same email is already exist');
    } else {
      resetForm();
      setSubmitting(false);
    }
  }
};

const MyForm = () => (
  <Formik
    initialValues={{
      name: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      website: '',
      age: 0,
      currentSkill: '',
      skills: [],
      acceptedTerms: false, // added for our checkbox
    }}
    validationSchema={Schema.validSchema}
    onSubmit={SubmitForm}
  >
    {props => {
      return (
        <Col className="text-input" xs={20} sm={16}>
          <div name="register"></div>
          <Form onSubmit={props.handleSubmit}
            className="MyForm">
            <MyTextInput label="Name" name="name" type="text" placeholder="Vasay" />
            <MyTextInput label="Password" name="password" type="password" placeholder="password" />
            <MyTextInput
              label="Password Confirmation"
              name="passwordConfirmation"
              type="password"
              placeholder="confirm password"
            />
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />
            <ErrorMessage name="Email" />
            <MyTextInput
              label="Website"
              name="website"
              type="url"
              placeholder="http://www.site.com"
            />
            <MyTextInput label="Age" name="age" type="number" min={0} />
      
            <FieldArray
              name="skills"
              render={arrayHelpers => {
                const array = props.values.skills;
               
                return (
                  <>
                    Skills
                    <div>
                     
                      <Field
                        name="currentSkill"
                        onKeyPress={evt => {
                          if (evt.key === "Enter") {
                            evt.preventDefault();
                            if (props.values.currentSkill.length > 0 ) {
                              arrayHelpers.push(props.values.currentSkill);
                              props.setFieldValue('currentSkill', '');
                            }
                          }
                        }}
                        className="inputSkill"
                      />
                      <Button
                        className="btn-add"
                        htmlType="button"
                        type="button"
                        onClick={() => {
                          if (props.values.currentSkill.length > 0) {
                            arrayHelpers.push(props.values.currentSkill);
                            props.setFieldValue('currentSkill', '');
                          }
                        }}
                      >
                        Add a Skill
                      </Button>
                      <div className="skillsWrapper">
                      {array
                        .map((friend, index) => (
                          <div key={index} style={{ marginRight: '20px' }}>
                            <div className="skill">
                              {friend }  
                              <Button
                                shape="circle"
                                size="small"
                                htmlType="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                              x
                              </Button>                      
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              }}
            />
            <MyCheckbox name="acceptedTerms">I accept the terms and conditions</MyCheckbox>
            <div className="send-div">
              {props.isSubmitting ? (
                <Spin />
              ) : (
                <Button type="primary" size="large" htmlType="submit">
                  Submit
                </Button>
              )}
            </div>
          </Form>
        </Col>
      );
    }}
  </Formik>
);

export default MyForm;
