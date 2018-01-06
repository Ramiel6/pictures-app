import React from 'react';
import { connect } from 'react-redux';
import { profilePictureError, updateProfile, changePassword } from '../../redux/actions/auth-actions';

import ChangePasswordView from './ChangePasswordView';
import EditProfileView from './EditProfileView';


class UpdateProfileContainer extends React.Component {
   
  submitProfile = values => this.props.updateProfile(values.name, values.profilePicture);
  
  submitPassword = values => this.props.changePassword(values.oldPassword, values.password);
  
  handelProfilePicError = error => this.props.profilePictureError(error)
   
   render() {
      const initialValues = {
               name : this.props.user && this.props.user.local && this.props.user.local.name,
               profilePicture: this.props.user && this.props.user.local && this.props.user.local.profilePicture
            };
      return (
         <div>
           <EditProfileView 
              onSubmit={this.submitProfile}
              profilePicHolder ={this.props.profilePicHolder}
              profilePicError = {this.props.profilePicError}
              handelProfilePicError = {this.handelProfilePicError}
              user = {this.props.user && this.props.user.local }
              initialValues = {initialValues}
            />
           <ChangePasswordView  onSubmit={this.submitPassword}/>
         </div>
      );
    }
}


// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    profilePicHolder: state.form.editProfile && state.form.editProfile.values && state.form.editProfile.values.profilePicture,
    profilePicError: state.authorization.profilePicError,
    user: state.authorization.user,
    isLogedin : state.authorization.isLogedin
  };
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
   profilePictureError: error => dispatch(profilePictureError(error)),
   updateProfile: (name, profilePicture) => dispatch(updateProfile(name, profilePicture)),
   changePassword: (oldPassword,password) => dispatch(changePassword(oldPassword,password)),
  };
};


// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileContainer);