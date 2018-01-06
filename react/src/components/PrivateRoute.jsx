import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, authed,isLoaded, ...rest}) => {
  //https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
  return (
    <Route
      {...rest}
      render={isLoaded ? ((props) => authed 
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}} />) : null}
    />
    
  )
}
export default PrivateRoute