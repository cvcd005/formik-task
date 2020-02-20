import React from 'react';

import { Col, Button } from 'antd';
import * as Yup from 'yup';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';

import submit from '../Api/Api';

import MyTextInput from './MyTextInput';
import MyCheckbox from './MyCheckbox';
import Spinner from '../Spinner';

const MyNewForm = () => (
  <Formik
    initialValues={{
      name: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      website: '',
      age: 0,
      skills: [],
      acceptedTerms: false, // added for our checkbox
    }}
    validationSchema={Yup.object({
      name: Yup.string()
        .max(50, 'Must 50 characters or less')
        .required('You must enter Name'),
      password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .max(40, 'Must be 40 characters or less')
        .matches(/[0-9]+/, 'Password must contain at least one digit')
        .matches(/[A-Z]+/, 'Password must contain an one uppercase character')
        .matches(/^[a-zA-Z0-9]{8,}$/, 'Password have only latin letters and digits')
        .required('You must enter password'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('You must confirm password'),
      email: Yup.string()
        .email('Invalid email address')
        .required('You must enter email'),
      website: Yup.string().url('Mustbe a valid url'),
      age: Yup.number('Must be an integer')
        .min(18, 'Must be in range of 18 and 65')
        .max(65, 'Must be in range of 18 and 65')
        .required('You must enter your age'),
      skills: Yup.array().of(Yup.string()),
      acceptedTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept the terms and conditions.'),
    })}
    onSubmit={submit}
  >
    {props => {
      if (props.isSubmitting) {
        return <Spinner />;
      }
      return (
        <Col className="text-input" xs={20} sm={16}>
          <Form onSubmit={props.handleSubmit} className="MyForm">
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
                if (array.length === 0) {
                  array.push('');
                }
                return (
                  <>
                    Skills
                    <div className="skillsWrapper">
                      <Button
                        className="btn-add"
                        htmlType="button"
                        type="button"
                        onClick={() =>
                          array[array.length - 1].length > 0 ? arrayHelpers.push('') : 0
                        }
                      >
                        Add a Skill
                      </Button>
                      {array.map((friend, index) => (
                          <div key={index} style={{ marginRight: '20px' }}>
                            <Field
                              className="skill"
                              name={`skills.${index}`}
                              disabled={index !== array.length - 1}
                            />
                            {index === array.length - 1 ? null : (
                              <Button
                                shape="circle"
                                size="small"
                                htmlType="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                x
                              </Button>
                            )}
                          </div>
                        ))
                        .reverse()}
                    </div>
                  </>
                );
              }}
            />
            <MyCheckbox name="acceptedTerms">I accept the terms and conditions</MyCheckbox>
            <Button type="submit" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
      );
    }}
  </Formik>
);

export default MyNewForm;
