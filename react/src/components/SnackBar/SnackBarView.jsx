import React from 'react';
import { Icon } from 'semantic-ui-react';
import './SnackBarView.css';



const SnackBarView = props => {
  return(
      
      <div className={"snackbar " + (props.show ? 'show': 'close')}>
            <span className="title">
                {props.message + ' '}
            </span>
            <Icon name="close" color='grey' className="float-right cursor-pointer" onClick={props.closeSnackbar}/>
        </div>
      
)};

export default SnackBarView;

