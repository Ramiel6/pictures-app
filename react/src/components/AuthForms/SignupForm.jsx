import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Header, Icon, Message, Label} from 'semantic-ui-react';
import './AuthForms.css';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'email', 'password', 'confirmPassword', 'name'];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
    else if (values[ field ].length > 100) {
      errors[ field ] = 'Value is too long';
    }
  });
  
  if (!/^[^\s](\s?[\w\d])*$/gi.test(values.name)) {
    errors.name = 'Only letters and numbers allowed!';
  }
  
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (values.password !== values.confirmPassword){
    errors.confirmPassword = 'Password did not match!';
  }
  // console.log(errors)
  return errors;
};


const renderTextField = ({ input, name, type, meta: { touched, error }, ...custom }) => (
     
  <Form.Group inline style={{marginLeft:'27.5%'}}>
      <Form.Input 
          width={10}
          name={name}
          type={type}
          error = {touched && error}
          {...input}
          {...custom}
        />
        {(touched && error) && <Label basic color='red' pointing='left'>{error}</Label> }
    </Form.Group>
      
);


let SignupForm = props => {
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
      <Grid.Column>
        <Header as='h2' color='teal' textAlign='center'>
          <Icon name='signup' size='massive' />
          {' '}Create New Account
        </Header>
        </Grid.Column>
        </Grid.Row>
      <Grid.Row>
      <Grid.Column textAlign='center'>
        <Form onSubmit={handleSubmit}>
          
            <Field component={renderTextField}
              name="name" 
              type="text"
              icon='user'
              iconPosition='left'
              placeholder='Your Name (You can change it later).'
            />
            
            <Field component={renderTextField}
              name="email" 
              type="email"
              icon='mail'
              iconPosition='left'
              placeholder='E-mail address'
            />
            <Field component={renderTextField}
              fluid
              name="password"
              type="password"
              icon='lock'
              iconPosition='left'
              placeholder='Password'
            />
            <Field component={renderTextField}
              name="confirmPassword"
              type="password"
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
            />
           
            <Button color='teal' type='submit' style={{width:'45%'}} size='large' loading={submitting} disabled={submitting}>Sign Up</Button>
            {error && <Message
              negative
              content={error}
            />}
          
        </Form>
        
      </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)};
SignupForm = reduxForm({
  // a unique name for the form
  form: 'signup',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(SignupForm);
export default SignupForm;