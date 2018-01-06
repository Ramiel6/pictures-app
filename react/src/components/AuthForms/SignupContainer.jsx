import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../redux/actions/auth-actions';
import SignupForm from './SignupForm';


class SignupContainer extends React.Component {
   
    submit = values => {
        // print the form values to the console
        console.log(values);
        let user = {
          name:values.name,
          email: values.email,
          password: values.password
        };
        return this.props.signUp(user);
    };

    render() {
      return (
         <SignupForm  onSubmit={this.submit}/>
      );
    }
}


// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authorization.user,
    isLogedin : state.authorization.isLogedin
  };
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
   signUp: user => dispatch(signUp(user))
  };
};


// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);