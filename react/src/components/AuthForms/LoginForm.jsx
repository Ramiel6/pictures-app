import React from 'react'
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Header, Icon, Message,Label, Segment} from 'semantic-ui-react';
import './AuthForms.css';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'email', 'password'];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
    else if (values[ field ].length > 100) {
      errors[ field ] = 'Value is too long';
    }
  });
  
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
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
        {(touched && error) && <Label basic color='red' pointing style={{width:'100%'}}>{error}</Label> }
      </Form.Field>
);


let LoginForm = props => {
  const { error, handleSubmit, submitting} = props;
  return(
  <div className='form-padding'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column mobile={12} computer={6} width={6}>
        <Header as='h2' color='teal' textAlign='center'>
          <Icon name='sign in' size='massive' />
          {' '}Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Field component={renderTextField}
              
              name="email" 
              type="email"
              icon='mail'
              iconPosition='left'
              placeholder='E-mail address'
            />
            <Field component={renderTextField}
              name="password"
              type="password"
              icon='lock'
              iconPosition='left'
              placeholder='Password'
            />

            <Button color='teal' type='submit' fluid size='large' loading={submitting} disabled={submitting}>Login</Button>
            {error && <Message
              negative
              content={error}
            />}
          </Segment>
        </Form>
        <Message>
          New to us? <Link to='/signup'>Sign Up</Link>
        </Message>
        <Message>
         <p> Or login with</p>
          <Button color='google plus' as='a' href="/auth/google" size='small'>
                  <Icon name='google' /> Google Account
                </Button>{' '}
          <Button basic as='a' href="/auth/github" size='small'>
              <Icon name='github' /> Github Account
          </Button>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)};
LoginForm = reduxForm({
  // a unique name for the form
  form: 'login',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(LoginForm);
export default LoginForm;