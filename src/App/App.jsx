import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField, FieldArray, Field } from 'formik';
import { Button } from  'antd';
import axios from "axios";

import MyForm from '../MyForm';
import ContentWrapper from '../ContentWrapper';

import test, {obj }from '../Api/Api'

import './App.scss';
import 'antd/dist/antd.css';



const submit = async (values, { setSubmitting, resetForm, setFieldError }) => {
  try {
    const response = await test(values);
    resetForm();
    setSubmitting(false);
  }
  catch (error) {
    setFieldError('email', 'User with same email is already exist');
  }
};
         

const App = () => {
   
    return (
      <ContentWrapper>
     
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
            website: Yup.string()
              .url('Mustbe a valid url'),
            age: Yup.number('Must be an integer')
              .min(18, 'Must be in range of 18 and 65')
              .max(65, 'Must be in range of 18 and 65')
              .required('You must enter your age'),
            skills: Yup.array()
              .of(Yup.string()),
            acceptedTerms: Yup.boolean()
              .required('Required')
              .oneOf([true], 'You must accept the terms and conditions.'),
          })}
          onSubmit={submit}
         
          
    

        >
         
          {obj => <MyForm {...obj} />}
         
          
        </Formik>
     
     </ContentWrapper>
    );

};

export default App;