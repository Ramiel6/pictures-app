//https://themeteorchef.com/tutorials/getting-started-with-react-router-v4
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './tailwindcss-utilities.min.css'
import './semantic/semantic.min.css';
import  AppRouter  from './components/AppRouter.jsx';
import './global.css';

// import registerServiceWorker from './registerServiceWorker';


import store from './redux/configureStore';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
ReactDOM.render(
 <Provider store={store}>
  <AppRouter />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();