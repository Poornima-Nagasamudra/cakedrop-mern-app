import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import configureStore from './Store/configureStore';
import { startGetProduct } from './Actions/ProductAction';
import { startGetMyOrders } from './Actions/OrderAction.jsx';



const store = configureStore()
console.log('state', store.getState())

if(localStorage.getItem('token')){
  store.dispatch(startGetProduct())
  store.dispatch(startGetMyOrders())
}

store.subscribe(function(){
  console.log(store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
    </StrictMode>,
)
