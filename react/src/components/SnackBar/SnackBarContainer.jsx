import React from 'react';
import { connect } from 'react-redux';
import {showSanckbar} from '../../redux/actions/view-actions' 
import SnackBarView from './SnackBarView.jsx';



class SnackBarContainer extends React.Component {
    handelCloseSanckbar = (show,message) => this.props.showSanckbar(false, null)
    render() {
      return (
         <SnackBarView 
            show={this.props.snackbarShow}  
            message={this.props.snackbarMsg} 
            closeSnackbar = {this.handelCloseSanckbar}
            />
      );
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {

  return {
    snackbarShow: state.viewHandler.snackbarShow,
    snackbarMsg: state.viewHandler.snackbarMsg,
  }
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  showSanckbar: (show,message) => dispatch(showSanckbar(show,message)),
   
//   updateSyncErrors: (form,syncErrors) => dispatch(UPDATE_SYNC_ERRORS(form,syncErrors))
  }
};


// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(SnackBarContainer);