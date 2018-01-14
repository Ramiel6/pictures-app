import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Message, Label} from 'semantic-ui-react';
import './UpdateProfile.css';

const validate = values => {
  const errors = {};
  const requiredFields = ['oldPassword', 'password', 'confirmPassword'];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
    else if (values[ field ].length > 100) {
      errors[ field ] = 'Value is too long';
    }
  });
  
  if (values.password !== values.confirmPassword){
    errors.confirmPassword = 'Password did not match!';
  }
  // console.log(errors)
  return errors;
};


const renderTextField = ({ input, name, type, meta: { touched, error }, ...custom }) => (
     
  <Form.Field error = {touched && error}>
      <input
          name={name}
          type={type}
          {...input}
          {...custom}
        />
        {(touched && error) && <Label basic color='red' pointing>{error}</Label> }
    </Form.Field>
      
);


let ChangePasswordView = props => {
  const { error, handleSubmit, submitting} = props;
  return(
  <div className='form-padding'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <Grid centered
       textAlign='center' 
       verticalAlign='middle'
    >
    
      <Grid.Row>
      <Grid.Column textAlign='center' mobile={14} computer={8} width={8}>
        <Form onSubmit={handleSubmit}>
          
            <Field component={renderTextField}
              fluid
              name="oldPassword"
              type="password"
              icon='lock'
              iconPosition='left'
              placeholder='Old Password'
            />
            <Field component={renderTextField}
              fluid
              name="password"
              type="password"
              icon='lock'
              iconPosition='left'
              placeholder='New Password'
            />
            <Field component={renderTextField}
              name="confirmPassword"
              type="password"
              icon='lock'
              iconPosition='left'
              placeholder='Confirm New Password'
            />
           
            <Button color='teal' type='submit' fluid size='large' loading={submitting} disabled={submitting}>Change</Button>
            {error && <Message 
              fluid
              negative
              content={error}
            />}
          
        </Form>
        
      </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)};
ChangePasswordView = reduxForm({
  // a unique name for the form
  form: 'updateProfile',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(ChangePasswordView);
export default ChangePasswordView;