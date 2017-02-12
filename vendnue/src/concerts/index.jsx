import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import { configureStore } from '../store.js';
import { ConcertContainer } from '../containers';

import Navbar from '../components/VendnueNavbar.jsx';

var initialState = {
    concertApiCall: {
        loading: false,
        error: false,
        errorMessage: ''
    },
    socialApiCall: {
        loading: false,
        error: false,
        errorMessage: ''
    },
    navBar:{
        isLoggedIn: false,
        user: {}
    },
    title: {
        concertName: '',
        artistsPerforming: [],
        concertDate: ''
    },
    mapBox: {
        map: {
            activeSection: '',
            sections: []
        },
        concertDataSummary: {}
    },
    ticketsBox: {
        ticketsExchange: {
            sections: [],
            activeSection: ''
        }
    },
    socialMediaBox: {
        concertName: '',
    }
}

var store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
    <div>
        <Navbar />
        <ConcertContainer />
    </div>
    </Provider>
    ,document.getElementById('main'));
