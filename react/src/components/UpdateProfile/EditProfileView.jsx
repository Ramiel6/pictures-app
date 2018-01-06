import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Header, Icon, Image, Message, Label} from 'semantic-ui-react';
import './UpdateProfile.css';
import avatar from '../../assets/avatar.png';
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  else if (values.name.length > 100) {
    errors.name = 'Value is too long';
  }
  // if (!values.profilePicture) {
  //   errors.profilePicture = 'Required';
  // }
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


let EditProfileView = props => {
  const { error, handleSubmit, submitting, profilePicHolder, profilePicError, handelProfilePicError } = props;
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
          <Icon name='edit' size='massive' />
          {' '}Edit Profile
        </Header>
        </Grid.Column>
      </Grid.Row>
      
    <Grid.Row>
      <Grid.Column textAlign='center'>
        { profilePicError && <Label basic color='red' pointing='below'>Broken Url</Label> }
        <Image 
          centered 
          circular 
          className='w-64 h-64' 
          src={ profilePicHolder || avatar } 
          onLoad={()=> handelProfilePicError(false)} 
          onError={()=> handelProfilePicError(true)}
          />
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
              name="profilePicture" 
              type= "text"
              icon='image'
              iconPosition='left'
              placeholder='Profile Picture URL'
            />
           
            <Button color='teal' type='submit' style={{width:'45%'}} size='large' loading={submitting} disabled={profilePicError || submitting}>Change</Button>
            {error && <Message
              style={{width:'45%', marginLeft:'27.5%'}}
              negative
              content={error}
            />}
          
        </Form>
        
      </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)};
EditProfileView = reduxForm({
  // a unique name for the form
  form: 'editProfile',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(EditProfileView);
export default EditProfileView;