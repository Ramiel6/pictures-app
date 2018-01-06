import React from 'react';
import { connect } from 'react-redux';
import ProfileView from './ProfileView'
class ProfileContainer extends React.Component {
     
     render() {
         return (
             <ProfileView 
                user = {this.props.user}
             />
             
             );
    }
}
// Maps state from store to props
const mapStateToProps = (state, ownProps) => {

  return {
    user : state.authorization.user,
  };
};
// Maps actions to props
// const mapDispatchToProps = (dispatch) => {
//   return {
//   getPictures: pictures => dispatch(getPictures(pictures)),

  
//   };
// };


// Use connect to put them together
export default connect(mapStateToProps, null)(ProfileContainer);