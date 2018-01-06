import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { ConnectedRouter } from 'react-router-redux';

import {addTags, setViewValue, setSearchValue, sortPictures} from '../redux/actions/pic-actions';
import {getStatus, logout} from '../redux/actions/auth-actions' ;
import {showSanckbar,  activateNav} from '../redux/actions/view-actions';


import { Container } from 'semantic-ui-react';

import PrivateRoute from './PrivateRoute';
import MainContainer from './MainComp/MainContainer';
import NavView from './NavView/NavView';
import FooterView from './FooterView/FooterView';
import LoginContainer from './AuthForms/LoginContainer';
import SignupContainer from './AuthForms/SignupContainer';
import AddContainer from './AddForm/AddContainer';
import SnackBarContainer from './SnackBar/SnackBarContainer';
import ProfileContainer from './ProfilePage/ProfileContainer';
import UpdateProfileContainer from './UpdateProfile/UpdateProfileContainer';
import AboutView from './AboutView/AboutView';


// const FadingRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     <Transition.Group animation='fade left'>
//       <Component {...props}/>
//     </Transition.Group>
//   )}/>
// );

class AppRouter extends React.Component {
  componentDidMount(){
        const {getStatus} = this.props;
        getStatus();
      }
  
  handelViewChange = (e,data) => this.props.setViewValue(data.value)  
   
  handelSortPictures = (e,data) => this.props.sortPictures(data.value) 
  
  handelSearchByTags = (e,data) => this.props.setSearchValue(data.value)
  
  handelactivateNav = active => this.props.activateNav(active)
  // handelshowSanckbar = (show,message) => this.props.showSanckbar(true,'test')
   
    render() {
      
      return (
         
        <ConnectedRouter history={history}>
          <div>
            
            <NavView 
              isLogedin={this.props.isLogedin}  
              logout={this.props.logout} 
              viewChange={this.handelViewChange}
              sortPictures = {this.handelSortPictures}
              searchByTags = {this.handelSearchByTags}
              activeMenu ={this.props.activeMenu}
              activateNav ={this.handelactivateNav}
              user = {this.props.user && this.props.user.local}
              />
            
            <Container style={{ paddingTop: 60, minHeight: '85vh' }}>
            
              <SnackBarContainer />
              
              <Switch>
                <Route exact name="home" path="/" component={MainContainer} />
                <Route  name="login" path="/login" component={LoginContainer} />
                <Route  name="signup" path="/signup" component={SignupContainer} />
                <Route name="about" path='/about' component={AboutView} /> 
                <PrivateRoute 
                  name="add" path="/add-picture"
                  component={AddContainer}
                  isLoaded={this.props.isLoaded} 
                  authed={this.props.isLogedin}  
                   />
                <PrivateRoute 
                  name="profile" path="/profile" 
                  component={ProfileContainer} 
                  isLoaded={this.props.isLoaded} 
                  authed={this.props.isLogedin} 
                  />
                <PrivateRoute 
                  name="updateProfile" path="/update-profile" 
                  component={UpdateProfileContainer} 
                  isLoaded={this.props.isLoaded} 
                  authed={this.props.isLogedin} 
                  />
             </Switch>
           </Container>
           
           <FooterView />
        </div>
      </ConnectedRouter>
        
      );
    }
}
const mapStateToProps = (state, ownProps) => {
//   console.log({results: JSON.stringify(state)})
  return {
    pictures: state.picture.picturesArray,
    tags: state.picture.tags,
    activeMenu: state.viewHandler.activeMenu,
    isLogedin : state.authorization.isLogedin,
    isLoaded : state.authorization.isLoaded,
    user : state.authorization.user,
    location: state.router.location,
   
  };
};
//Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  setViewValue: view => dispatch(setViewValue(view)),
  setSearchValue: value => dispatch(setSearchValue(value)),
  sortPictures: (sortBy) => dispatch(sortPictures(sortBy)),
  addTags: tagItem => dispatch(addTags(tagItem)),
  showSanckbar: (show,message) => dispatch(showSanckbar(show,message)),
  activateNav: activeMenu => dispatch(activateNav(activeMenu)),
  logout: () => dispatch(logout()),
  getStatus:() => dispatch(getStatus()),
  // setPageItems: pageOfItems => dispatch(setPageItems(pageOfItems)),
     
  };
};
//Use connect to put them together
export default connect(mapStateToProps,mapDispatchToProps)(AppRouter);