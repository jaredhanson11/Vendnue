import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import { configureStore } from '../store.js';
import SellContainer from './SellContainer.jsx';

import Navbar from '../components/VendnueNavbar.jsx';

var initialState = {

}

var store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
    <div>
    <Navbar />
    <SellContainer />
    </div>
    </Provider>
    ,document.getElementById('main'));