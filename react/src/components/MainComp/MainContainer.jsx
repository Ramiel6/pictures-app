import React from 'react';
import { connect } from 'react-redux';

import { mainSelectedPic, mainModelShow } from '../../redux/actions/view-actions';
import { getPictures, likePicture, unlikePicture, linkToPicture, unlinkToPicture, deletePicture } from '../../redux/actions/pic-actions';

import MainView from './MainView.jsx';



class MainContainer extends React.Component {
       
    handelGetPictures = (loading) => this.props.getPictures(loading)
    
    handelModelActivation = (picture, active) =>{
      this.props.getSelectedPic(picture);
      this.props.activateModel(active);  
    }
    handleLikePicture = (picture) => {
      this.props.likePicture(picture);
      }
    handleUnlikePicture = (picture) => {
        this.props.unlikePicture(picture);
        }
    handleLinkToPicture = (picture) => {
      this.props.linkToPicture(picture);
      }
    handleUnLinkToPicture = (picture) => {
      this.props.unlinkToPicture(picture);
      }
    handelDeletePicture = (picture) => {
      this.props.deletePicture(picture)
        .then( ()=> {
          this.handelModelActivation(null,false);
          }).catch((error)=>{console.log('Picture Remove error')});
    };
    
    render() {
      return (
         <MainView
            pictures = {this.props.picturesSet}
            selectedPicture = {this.props.selectedPicture}
            modelShow = {this.props.modelShow}
            handelModelActivation = {this.handelModelActivation}
            getPictures = {this.handelGetPictures}
            likePicture = {this.handleLikePicture}
            unlikePicture = {this.handleUnlikePicture}
            linkToPicture = {this.handleLinkToPicture}
            unlinkToPicture = {this.handleUnLinkToPicture}
            deletePicture = {this.handelDeletePicture}
            pageLoading ={this.props.pageLoading}
            user = {this.props.user}
         />
      );
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {

  return {
    pictures: state.picture.picturesArray,
    picturesSet: state.picture.picturesSetArray,
    pageLoading: state.picture.isLoading,
    selectedPicture : state.viewHandler.mainSelectedPic,
    modelShow : state.viewHandler.mainModelShow,
    user : state.authorization.user,
  };
};
// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  getPictures: loading => dispatch(getPictures(loading)),
  getSelectedPic: picture => dispatch(mainSelectedPic(picture)),
  activateModel: active => dispatch(mainModelShow(active)), 
  likePicture: picture => dispatch(likePicture(picture)),
  unlikePicture: picture => dispatch(unlikePicture(picture)),
  linkToPicture: picture => dispatch(linkToPicture(picture)),
  unlinkToPicture: picture => dispatch(unlinkToPicture(picture)),
  deletePicture: picture => dispatch(deletePicture(picture))
  
  };
};


// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);