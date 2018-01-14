import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Header, Icon, Message, Segment, Label, Image } from 'semantic-ui-react';
import './AddForm.css';

const validate = (values,data) => {
  // console.log(data)
  const errors = {};
  if (!values.picUrl) {
      errors.picUrl = 'Required';
    }
  
  // if (values.picUrl && values.picUrl.length > 100) {
  //     errors.picUrl = 'Value is too long';
  //   }
  // if (values.picUrl && values.picUrl.length < 4) {
  //     errors.picUrl = 'Value is too short';
  //   }
  if (!/^[^\s](\s?[\w\d])*$/gi.test(values.name)) {
    errors.name = 'Only letters and numbers allowed!';
  }
  if (values.desc && values.desc.length > 255) {
      errors.desc = 'Value is too long';
    }
  if (data.tags.length <= 0 ) {
      errors.addTag = 'Require at least one tag';
    }
  else if (data.tags.includes(values.addTag)) {
      errors.addTag = 'alreay here';
    }
  // console.log(errors)
  return errors;
};


const renderTextField = ({ input, name, type, meta: { touched, error }, ...custom }) => (
     <Form.Field error = {touched && error}>
      {(touched && error) && <Label basic color='red' pointing='below'>{error}</Label> }
      <Form.Input
          name={name}
          type={type}
          {...input}
          {...custom}
        />
      </Form.Field>
);
const renderTextArea = ({ input, name, type, meta: { touched, error }, ...custom }) => (
     <Form.Field error = {touched && error}>
      {(touched && error) && <Label basic color='red' pointing='below'>{error}</Label> }
      <textarea rows="4"
          name={name}
          type={type}
          {...input}
          {...custom}
        />
      </Form.Field>
);


let AddForm = props => {
  const { error, handleSubmit, submitting, picUrl, picUrlError, tags, addTags, removeTags, handelPicError} = props;
  return(
  <div className='form-padding'>
    <Grid
      centered
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Row textAlign='center'>
       <Grid.Column>
        <Header as='h2' color='teal' textAlign='center'>
          <Icon name='add' size='massive' />
          {' '}Add New Picture
        </Header>
        </Grid.Column>
        </Grid.Row>
    <Grid.Row>
      <Grid.Column width={8} mobile={14} computer={8}>
        
       {picUrl && picUrlError && <Label basic color='red' pointing='below'>Broken Link</Label>}
        {picUrl && 
          <Segment className={picUrlError ? 'img-error': ''}>
            
            <Image onLoad={()=> handelPicError(false)} onError={()=> handelPicError(true)}  src={picUrl} /> 
            
          </Segment>
        }
        <Form onSubmit={handleSubmit}>
          
            <Field component={renderTextField}
              name="picUrl" 
              type="text"
              icon='linkify'
              iconPosition='left'
              placeholder='Picture URL'
            />
            
            <Field component={renderTextArea}
              name="desc" 
              type="text"
              icon='write'
              placeholder='Picture Description (Optional)'
            />
            {tags.length > 0 && <Segment>
            {tags.map((tagItem,index) => (<Label tag key={index} style={{marginLeft: '1.3em'}}>{tagItem}<Icon name='delete' style={{float:'right'}} onClick={()=> removeTags(tagItem)}/></Label>))}
            
            
            </Segment>}
            <Field component={renderTextField}
                name="addTag"
                type="text"
                icon='tags'
                iconPosition='left'
                placeholder='Add Tags Optionals'
                action={ <Button color='teal' type='button' onClick={addTags} style={{borderRadius:'0 4px 4px 0'}}>Add</Button>}
              />
             
            <Button color='teal' type='submit'  loading={submitting} disabled={submitting || picUrlError}>Save</Button>
            {error && <Message
              negative
              content='error'
            />}
          
        </Form>
        
      </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)};
AddForm = reduxForm({
  // a unique name for the form
  form: 'addform',
  validate, // <--- validation function given to redux-form
//   warn // <--- warning function given to redux-form
})(AddForm);

export default AddForm;


// const selector = formValueSelector('addform') // <-- same as form name
// AddForm = connect(state => {
//   // can select values individually
//   const addTag = selector(state, 'addTag')
//   return {addTag}
    
// })(AddForm)