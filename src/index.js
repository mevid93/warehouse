import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'; 
import categoryReducer from './reducers/categoryReducer';
import productsReducer from './reducers/productsReducer';

// create combined reducer
const reducer = combineReducers({
  category: categoryReducer,
  products: productsReducer
})

// create store
const store = createStore(reducer)

// render app and provide the redux store
// for all components to access
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

