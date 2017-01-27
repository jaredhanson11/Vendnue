import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import { configureStore } from '../store.js';
import { ConcertContainer } from '../containers';

var initialState = {
    concert: {
        isLoading: false,
        isLoaded: false,
        payload: '',
        error: '',
        errorMessage: ''
    }
}

var store = configureStore(initialState);

ReactDOM.render(
       (<Provider store={store}>
         <ConcertContainer />
         </Provider>
       ),document.getElementById('main'));
