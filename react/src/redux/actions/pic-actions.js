import Axios from 'axios';
import { push } from 'react-router-redux';
import store from '../configureStore';
import {showSanckbar} from './view-actions';

export const addTagsAction = (tagItem) => {
  return {
    type: 'Add_Tags',
    tagItem,
  };
};
export const resetTagsAction = () => {
  return {
    type: 'Reset_Tags',
  };
};
export const removeTagsAction = (tagItem) => {
  return {
    type: 'Remove_Tags',
    tagItem,
  };
};
export const PicErrorAction = (error) => {
  return {
    type: 'Pic_Has_Error',
    error,
  };
};
export const getPicturesAction = (pictures) => {
  return {
    type: 'Get_Pictures',
    pictures,
  };
};
export const setPicturesAction = (pictures) => {
  return {
    type: 'Set_Pictures',
    pictures,
  };
};
export const setViewValueAction = (view) => {
  return {
    type: 'Set_View_Value',
    view,
  };
};
export const sortByValueAction = (sortBy) => {
  return {
    type: 'Sort_By_Value',
    sortBy,
  };
};
export const setSearchValueAction = (value) => {
  return {
    type: 'Search_Value',
    value,
  };
};
export const isLoadingAction = (value) => {
  return {
    type: 'Is_Loading',
    value,
  };
};
// Actions Creators
export const addTags = function (tagItem){
  return function(dispatch) {
      dispatch(addTagsAction(tagItem));
  };
};
export const removeTags = function (tagItem){
  return function(dispatch) {
      dispatch(removeTagsAction(tagItem));
  };
};
export const picError = function (error){
  return function(dispatch) {
      dispatch(PicErrorAction(error));
  };
};
export const setViewValue = function (view){
  
  return function(dispatch) {
   dispatch(setViewValueAction(view));
   dispatch(setPictures());
  };
};
export const setSearchValue = function (value){
  
  return function(dispatch) {
   dispatch(setSearchValueAction(value));
   dispatch(setPictures());
  };
};

export const setPictures = function (){
  let pictureArray =[];
  let user = store.getState().authorization.user;
  let view = store.getState().picture.viewValue;
  let searchValue = store.getState().picture.searchValue;
  let pictures = store.getState().picture.picturesArray;
  let sortBy = store.getState().picture.sortByValue;
  if (pictures) {
    if(user && view === 'user'){
      pictureArray = pictures.filter((picture) => searchValue ? 
      (picture.linkers.includes(user._id) || picture.owner.id === user._id) && picture.tags.join(' ').toLowerCase().includes(searchValue.trim().toLowerCase())
      : (picture.linkers.includes(user._id) || picture.owner.id === user._id));
    }
    else if(user && view === 'owend'){
      pictureArray = pictures.filter((picture) => searchValue ?
      picture.owner.id === user._id && picture.tags.join(' ').toLowerCase().includes(searchValue.trim().toLowerCase())
      : picture.owner.id === user._id);
    }
    else if(user && view === 'linked'){
      pictureArray = pictures.filter((picture) => searchValue ?
      picture.linkers.includes(user._id) && picture.tags.join(' ').toLowerCase().includes(searchValue.trim().toLowerCase())
      : picture.linkers.includes(user._id));
    }
    else{
      pictureArray = pictures.filter((picture) => searchValue ? 
                        picture.tags.join(' ').toLowerCase().includes(searchValue.trim().toLowerCase())
                        : pictures);
    }
    pictureArray = sortArray(pictureArray,sortBy);
    return function(dispatch) {
        dispatch(setPicturesAction(pictureArray));
    };
  } else {
    return null;
  }
};

const sortArray = (pictureArray, sortBy) =>{
  if (sortBy === 'likes'){
      pictureArray = pictureArray.slice(0).sort((a,b) => b.likes.length - a.likes.length);
     }
    else if (sortBy === 'dateAsce'){
      pictureArray = pictureArray.slice(0).sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
     }
    else{
      pictureArray = pictureArray.slice(0).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return pictureArray;
};
export const sortPictures = function (sortBy){
  //https://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date
  let pictureArray = store.getState().picture.picturesSetArray;
  pictureArray = pictureArray && sortArray(pictureArray, sortBy);
  
  return function(dispatch) {
      dispatch(setPicturesAction(pictureArray));
      dispatch(sortByValueAction(sortBy));
  };
};

export const isLoading = function (value){
  return function(dispatch) {
      dispatch(isLoadingAction(value));
  };
};
// Asyn Actions
export const getPictures = function (loading=false){
  let view = store.getState().picture.viewValue;
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
      loading && dispatch(isLoading(true));
      // Returns a promise
      return Axios({
      method: 'GET',
      url: '/api/get-pictures',
      })
      .then(function Success (response) {
        // Dispatch another action
        // to consume data
        console.log(response);
        console.log("Success");
        // dispatch(getStatus());
        dispatch(getPicturesAction(response.data.results));
        dispatch(setPictures(view));
        loading && dispatch(isLoading(false));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error);
        loading && dispatch(isLoading(false));
      });
  };
};

export const savePicture = function (picture){
  if(store.getState().authorization.isLogedin){
    // Returns a dispatcher function
    // that dispatches an action at a later time
    return function(dispatch){
        // Returns a promise
        return Axios({
        method: 'POST',
        url: '/api/save-picture',
        data:picture
        })
        .then(function Success (response) {
          // Dispatch another action
          // to consume data
          console.log(response);
          console.log("Success");
          // dispatch(getStatus());
          dispatch(showSanckbar(true, 'Picture saved successfully'));
          dispatch(push('/'));
          dispatch(resetTagsAction());
        })
        .catch(function(error) {
          console.log("error");
          console.log(error);
        });
    };
  } else {
     return function(dispatch){
       dispatch(push('/login'));
       
     };
  }
};
export const deletePicture = function (picture){
  if(store.getState().authorization.isLogedin){
    // Returns a dispatcher function
    // that dispatches an action at a later time
    // console.log(picture);
    return function(dispatch){
        // Returns a promise
        return Axios({
        method: 'DELETE',
        url: '/api/delete-picture/'+ picture._id,
        })
        .then(function Success (response) {
          // Dispatch another action
          // to consume data
          console.log(response);
          console.log("Success");
          dispatch(getPictures(false));
          dispatch(showSanckbar(true, 'Picture Deleted'));
        })
        .catch(function(error) {
          console.log("error");
          console.log(error);
          return Promise.reject();
        });
    };
  } else {
     return function(dispatch){
       dispatch(push('/login'));
       return Promise.reject();
       
     };
  }
};

export const likePicture = function (picture){
  if(store.getState().authorization.isLogedin){
  let data = {
    pictureId: picture._id,
  };
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'PUT',
       url: '/api/like-picture',
       data:data
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        dispatch(getPictures(false));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error.response);
      });
  };
  } else {
     return function(dispatch){
       dispatch(push('/login'));
       
     };
  }
};
export const unlikePicture = function (picture){
  if(store.getState().authorization.isLogedin){
  let data = {
    pictureId: picture._id,
  };
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'PUT',
       url: '/api/unlike-picture',
       data:data
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        dispatch(getPictures(false));
        // dispatch(handelSnackbar(true,'unLiked Successfully',3000));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error.response);
        // dispatch(handelSnackbar(true,"Already done",3000));
      });
  };
  } else {
     return function(dispatch){
       dispatch(push('/login'));
       
     };
  }
};

export const linkToPicture = function (picture){
  if(store.getState().authorization.isLogedin){
  let data = {
    pictureId: picture._id,
  };
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'PUT',
       url: '/api/picture-linking',
       data:data
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        dispatch(getPictures(false));
        // dispatch(handelSnackbar(true,'Liked Successfully',3000));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error.response);
        // dispatch(handelSnackbar(true,"Already done",3000));
      });
  };
  } else {
     return function(dispatch){
       dispatch(push('/login'));
       
     };
  }
};

export const unlinkToPicture = function (picture){
  if(store.getState().authorization.isLogedin){
  let data = {
    pictureId: picture._id,
  };
  
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return function(dispatch){
     // Returns a promise
     return Axios({
       method: 'PUT',
       url: '/api/picture-unlinking',
       data:data
     })
      .then(function Success (json) {
        // Dispatch another action
        // to consume data
        console.log(json);
        console.log("Success");
        // console.log(json.data);
        dispatch(getPictures(false));
        // dispatch(handelSnackbar(true,'Liked Successfully',3000));
      })
      .catch(function(error) {
        console.log("error");
        console.log(error.response);
        // dispatch(handelSnackbar(true,"Already done",3000));
      });
  };
  } else {
     return function(dispatch){
       dispatch(push('/login'));
       
     };
  }
};