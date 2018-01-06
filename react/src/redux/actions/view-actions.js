export const paginationAction = (pager) => {
  return {
    type: 'Pagination_Action',
    pager,
  };
};
export const pageItemsAction = (pageOfItems) => {
  return {
    type: 'Page_Items_Action',
    pageOfItems,
  };
};
export const mainSelectedPicAction = (picture) => {
  return {
    type: 'Main_Selected_Pic',
    picture,
  };
};
export const mainModelShowAction = (active) => {
  return {
    type: 'Main_Model_Show',
    active,
  };
};

export const showSanckbarAction = (show,message) => {
  return {
    type: 'Snackbar_Show',
    show,
    message,
  };
};
export const activateNavAction = (activeMenu) => {
  return {
    type: 'Activate_Nav',
    activeMenu
  };
};
// Action Creators
export const pagination = function (pager){
  return function(dispatch) {
      dispatch(paginationAction(pager));
  };
};

export const setPageItems = function (pageOfItems){
  return function(dispatch) {
      dispatch(pageItemsAction(pageOfItems));
  };
};

export const mainSelectedPic = function (picture){
  return function(dispatch) {
      dispatch(mainSelectedPicAction(picture));
  };
};

export const mainModelShow = function (active){
  return function(dispatch) {
      dispatch(mainModelShowAction(active));
  };
};
export const showSanckbar = function (show, message, duration=3000){
  return function(dispatch) {
      dispatch(showSanckbarAction(show, message));
      setTimeout(() => { dispatch(showSanckbarAction(false, null)) },  duration);
  };
};
export const activateNav = function (activeMenu){
  return function(dispatch) {
      dispatch(activateNavAction(activeMenu));
  };
};