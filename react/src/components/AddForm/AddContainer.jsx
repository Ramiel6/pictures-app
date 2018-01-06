import React from 'react';
import { connect } from 'react-redux';
import {
    change  // The action creator
} from 'redux-form'

import { addTags, removeTags, picError, savePicture } from '../../redux/actions/pic-actions';
import { activateNav } from '../../redux/actions/view-actions'
import AddForm from './AddForm.jsx';



class AddContainer extends React.Component {
   
   componentDidMount(){
        this.props.activateNav('add')
      }
   submit = (values) => {
       if(this.props.tags.length > 0){
       let data = {
        picUrl: values.picUrl,
        description: values.desc || '',
        tags: this.props.tags || [],
        // owner: 'Ramy'
        
       };
       return this.props.savePicture(data);
       }else{
           this.props.changeFieldValue('addTag','');
       }
    
   };
   handelAddTags = () => {
       console.log(this.props.tagValue);
       this.props.addTags(this.props.tagValue);
       this.props.changeFieldValue('addTag','');
   };
  handelRemoveTags = tagItem => this.props.removeTags(tagItem)
  
  handelPicError = error => this.props.picError(error)
    // handelPicError = (e,data) => console.log(e,data)
       
    render() {
      return (
         <AddForm
             tags={this.props.tags}
             picUrl ={this.props.picUrl}
            
             addTags = {this.handelAddTags}
             removeTags = {this.handelRemoveTags}
             handelPicError ={this.handelPicError}
             picUrlError = {this.props.picUrlError}
             onSubmit = {this.submit}
         />
      );
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {

  return {
    tags: state.picture.tags,
    tagValue: state.form.addform && state.form.addform.values && state.form.addform.values.addTag,
    picUrl: state.form.addform && state.form.addform.values && state.form.addform.values.picUrl,
    picUrlError: state.picture.picUrlError,
  }
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
   addTags: tagItem => dispatch(addTags(tagItem)),
   removeTags: tagItem => dispatch(removeTags(tagItem)),
   picError: error => dispatch(picError(error)),
   savePicture: picture => dispatch(savePicture(picture)),
   changeFieldValue: (field, value)=> dispatch(change('addform', field, value)),
   activateNav: activeMenu => dispatch(activateNav(activeMenu)),
            
  }
};


// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(AddContainer);