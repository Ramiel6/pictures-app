import Axios from 'axios';
import { push } from 'react-router-redux';
import store from '../configureStore';
import { SubmissionError } from 'redux-form';
import {showSanckbar} from './view-actions';

export const singUpSuccess = (user) => {
  return {
    type: 'Sing_Up_Success',
    user
  };
};
export const loginSuccess = (user) => {
  return {
    type: 'Login_Success',
    user,
  };
};
export const logoutSuccess = () => {
  return {
    type: 'logout_Success',
  };
};
export const getStatusSuccess = (data) => {
  return {
    type: 'get_Status_Success',
    user: data.user,
    isLogedin: data.isLogedin
  };
};
export const isLoadedAction = (ok) => {
  return {
    type: 'Is_Loaded',
    isLoaded: ok
  };
};
export const profilePicErorrAction = (error) => {
  return {
    type: 'Profile_Picture_Error',
    error,
  };
};

// action creators
export const profilePictureError = function (error){
  return function(dispatch) {
      dispatch(profilePicErorrAction(error));
  };
};

//Asyn Actions
export const signUp = function (user){
  // let data = {
  //   email: user.email,
  //   password: user.password
  // }
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'POST',
       url: '/register',
       data:user
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        dispatch(getStatus());
        dispatch(showSanckbar(true, 'Signed Up successfully'));
        store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error);
       throw new SubmissionError({ _error: error.response.data.err.err });
      });
  };
};
export const changePassword = function (oldPassword,password){
  if(store.getState().authorization.isLogedin){
    let user = store.getState().authorization.user;
    let data = {
      id: user._id,
      oldPassword: oldPassword,
      password: password,
    };
    // Returns a dispatcher function
    // that dispatches an action at a later time
    return function(dispatch){
       // Returns a promise
       return Axios({
         method: 'PUT',
         url: '/auth/change-password',
         data:data
       })
        .then(function Success (json) {
          // Dispatch another action
          // to consume data
          console.log(json);
          console.log("Success");
          dispatch(getStatus());
          dispatch(push('/profile'));
          dispatch(showSanckbar(true, 'Password Changed successfully'));
        })
        .catch(function(error) {
         console.log("error");
         console.log(error.response);
         throw new SubmissionError({ _error: error.response.data.err });
        });
    };
  } else {
    
    return function(dispatch){
        dispatch(push('/login'));
    };
  }
};
export const updateProfile = function (name, profilePicture){
  if(store.getState().authorization.isLogedin){
    let user = store.getState().authorization.user;
    let data = {
      id: user._id,
      name: name,
      profilePicture: profilePicture
    };
    // Returns a dispatcher function
    // that dispatches an action at a later time
    return function(dispatch){
       // Returns a promise
       return Axios({
         method: 'PUT',
         url: '/auth/change-profile',
         data:data
       })
        .then(function Success (json) {
          // Dispatch another action
          // to consume data
          console.log(json);
          console.log("Success");
          dispatch(getStatus());
          dispatch(push('/profile'));
          dispatch(showSanckbar(true, 'Profile Updated successfully'));
        })
        .catch(function(error) {
         console.log("error");
         console.log(error.response);
         throw new SubmissionError({ _error: error.response.data.err });
        });
    };
  } else {
    return function(dispatch){
        dispatch(push('/login'));
    };
  }
};
export const login = function (user){
  let data = {
    username: user.email,
    password: user.password
  };
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'PUT',
       url: '/login',
       data:data
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(loginSuccess(response.data.user));
        store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
       throw new SubmissionError({ _error: error.response.data.err.err });
      });
  };
};

export const unlinkLocal = function (){
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/unlink/local',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(getStatus());
        // dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};
export const unlinkGoogle = function (){
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/unlink/google',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(getStatus());
        // dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};
export const unlinkGithub = function (){
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/unlink/github',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(getStatus());
        // dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};
export const logout = function (){
 
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'GET',
       url: '/logout',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        dispatch(logoutSuccess());
        store.dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
      });
  };
};

export const getStatus = function (user){
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     dispatch(isLoadedAction(false));
     return Axios({
       method: 'GET',
       url: '/status',
     })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        
        console.log(response);
        console.log("Success");
        dispatch(getStatusSuccess(response.data));
        dispatch(isLoadedAction(true));
        // dispatch(push('/'));
      })
      .catch(function(error) {
       console.log("error");
       console.log(error.response);
       dispatch(isLoadedAction(true));
      });
  };
};
