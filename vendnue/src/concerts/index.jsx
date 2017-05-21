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
        loaded: false,
        error: false,
        errorMessage: ''
    },
    socialApiCall: {
        loading: false,
        loaded: false,
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
            sections: []
        },
        concertDataSummary: {
            sectionBid: {
                'volume_bids': 0,
                'average_price': 0,
                'hi_bid_price': 0,
                'low_bid_price': 0,
                'variance_price': 0
            },
            ticket: {
                'volume_tickets': 0,
                'average_ticket_price': 0,
                'hi_ticket_price': 0,
                'lo_ticket_price': 0,
                'variance_ticket_price': 0
            },
            soldTicket: {
                'volume_sold_tickets': 0,
                'average_sold_ticket_price': 0,
                'hi_sold_ticket_price': 0,
                'lo_sold_ticket_price': 0,
                'variance_sold_ticket_price': 0
            }
        }
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
