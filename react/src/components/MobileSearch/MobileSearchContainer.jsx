import React from 'react'
import { connect } from 'react-redux';
import MobileSearchView from './MobileSearchView';
import {setViewValue, setSearchValue, sortPictures} from '../../redux/actions/pic-actions';

class MobileSearchContainer extends React.Component{
    
    handelViewChange = (e,data) => this.props.setViewValue(data.value)  
    
    handelSortPictures = (e,data) => this.props.sortPictures(data.value) 
    
    handelSearchByTags = (e,data) => this.props.setSearchValue(data.value)
    
    render () {
        return (
            <MobileSearchView
                isLogedin={this.props.isLogedin}  
                viewChange={this.handelViewChange}
                sortPictures = {this.handelSortPictures}
                searchByTags = {this.handelSearchByTags}
            />
            
            )}
    
    
}

const mapStateToProps = (state, ownProps) => {
//   console.log({results: JSON.stringify(state)})
  return {
    isLogedin : state.authorization.isLogedin,
   
  };
};
//Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  setViewValue: view => dispatch(setViewValue(view)),
  setSearchValue: value => dispatch(setSearchValue(value)),
  sortPictures: (sortBy) => dispatch(sortPictures(sortBy)),
     
  };
};
//Use connect to put them together
export default connect(mapStateToProps,mapDispatchToProps)(MobileSearchContainer);