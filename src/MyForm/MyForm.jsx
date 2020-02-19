import React from 'react';
import { Form,  FieldArray, Field } from 'formik';
import { Col,  Button} from 'antd';

import MyTextInput from './MyTextInput';
import MyCheckbox from './MyCheckbox';

const MyForm = (props) => {

    return (
      <Col className="text-input" xs={20} sm={20} lg={{span:12, offset:6 }}>
        <Form onSubmit={props.handleSubmit} className="MyForm">
        
        <MyTextInput
          label="Name"
          name="Name"
          type="text"
          placeholder="Vasay"
        />
        <MyTextInput
          label="Password"
          name="Password"
          type="password"
          placeholder="password"
        />
        <MyTextInput
          label="Password Confirmation"
          name="PasswordConfirmation"
          type="password"
          placeholder="confirm password"
        />
            <MyTextInput
              label="Email Address"
              name="Email"
              type="email"
              placeholder="jane@formik.com"
            />
             <MyTextInput
              label="Website"
              name="Website"
              type="url"
              placeholder="http://www.site.com"
            />
            <MyTextInput
              label="Age"
              name="Age"
              type="number"
              min={0}
            />
    
        {console.log(props.values)}
        <FieldArray
         
          name="Skills"
          render={arrayHelpers => { 
                const array = props.values.Skills;
                if (array.length === 0) {
                  array.push('');
                }
                return (
                <>
                {'Skills'}
                <div className="skills">
                  
                  <button type="button" style={{width:'50%'}} onClick={() => array[array.length - 1].length > 0  ? arrayHelpers.push('') : 0   }>     
                    Add a Skill
                  </button>  
                  {array.map((friend, index) => (
                    <div key={index}>
                      <Field name={`Skills.${index}`} disabled={index === (array.length - 1) ? false: true} /> 
                      {index === (array.length - 1) ? null : <Button shape="circle" size="small" htmlType="button" onClick={() => arrayHelpers.remove(index) }>                
                      x
                      </Button>}
                    </div>
                  )).reverse()}
                                   
                 
               
                </div>
                </>
                )
                }
              }
            />
        <MyCheckbox name="AcceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>
           
                    <button type="submit">Submit</button>
                 
      </Form>
    </Col>
    )
}

export default MyForm;