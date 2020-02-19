import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField, FieldArray, Field } from 'formik';
import { Button } from  'antd';

import MyForm from '../MyForm';
import ContentWrapper from '../ContentWrapper';

import './App.scss';
import 'antd/dist/antd.css';

// Styled components ....
/*const StyledSelect = styled.select`
  /** ... * /
`;

const StyledErrorMessage = styled.div`
  /** ... * /
`;

const StyledLabel = styled.label`
 /** ...* /
`;
*/
/*/^.*[A-Z]+.*$/*/



const App = () => {
  
    return (
      <ContentWrapper>
     
        <Formik
          initialValues={{
            Name: '',
            Password: '',
            PasswordConfirmation: '',
            Email: '',
            Website: '',
            Age: 0,
            Skills: [],
            AcceptedTerms: false, // added for our checkbox
          }}
          validationSchema={Yup.object({
            Name: Yup.string()
              .max(50, 'Must 50 characters or less')
              .required('You must enter Name'),
            Password: Yup.string()
              .min(8, 'Password is too short - should be 8 chars minimum.')
              .max(40, 'Must be 40 characters or less')
              .matches(/[0-9]+/, 'Password must contain at least one digit')
              .matches(/[A-Z]+/, 'Password must contain an one uppercase character')
              .matches(/^[a-zA-Z0-9]{8,}$/, 'Password have only latin letters and digits')
              .required('You must enter password'),
            PasswordConfirmation: Yup.string()
              .oneOf([Yup.ref('Password'), null], 'Passwords must match')
              .required('You must confirm password'),
            Email: Yup.string()
              .email('Invalid email address')
              .required('You must enter email'),
            Website: Yup.string()
              .url('Mustbe a valid url'),
            Age: Yup.number('Must be an integer')
              .min(18, 'Must be in range of 18 and 65')
              .max(65, 'Must be in range of 18 and 65')
              .required('You must enter your age'),
            Skills: Yup.array()
              .of(Yup.string()),
            AcceptedTerms: Yup.boolean()
              .required('Required')
              .oneOf([true], 'You must accept the terms and conditions.'),
          })}
          onSubmit={values => console.log(values)}
         
        >
         
          {obj => <MyForm {...obj} />}
         
          
        </Formik>
     
     </ContentWrapper>
    );

};

export default App;