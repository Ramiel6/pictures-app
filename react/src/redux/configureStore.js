import {createStore, applyMiddleware} from 'redux';
import history from '../history';
import {routerMiddleware} from 'react-router-redux';
// Import thunk middleware
import thunk from 'redux-thunk';
import rootReducer from './reducers.js';


// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Development
//Apply redux-devtools-extension
// import { compose } from 'redux';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// function configureStore(initialState) {
//   return createStore(rootReducer, initialState, composeEnhancers(
//     // Apply to store
//     applyMiddleware(thunk,middleware)
//   ));
// }

// Production
function configureStore(initialState) {
  return createStore(rootReducer, initialState,
    // Apply to store
    applyMiddleware(thunk,middleware)
  );
}


const store = configureStore();
export default store;




