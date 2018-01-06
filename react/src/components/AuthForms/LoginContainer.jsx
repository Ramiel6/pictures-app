import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth-actions';
import LoginForm from './LoginForm';


class LoginContainer extends React.Component {
   
   submit = (values) => {
    // print the form values to the console
    // console.log(values)
    return this.props.login(values)
  }
  
    render() {
      return (
         <LoginForm  onSubmit={this.submit}/>
      );
    }
}


// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authorization.user,
    isLogedin : state.authorization.isLogedin
  }
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
   login: user => dispatch(login(user))
  }
};


// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);