import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import { configureStore } from '../store.js';
import SellContainer from './SellContainer.jsx';

import VendnueNavBar from '../components/VendnueNavbar.jsx';

var initialState = {
	concertQueryApiCall: {
        loading: false,
        loaded: false,
        error: false,
        errorMessage: '',
		concerts : [],
	},
	concertQuery: {
		prefix: '',
		selected: false,
	},
	concertInfoApiCall: {
		loading: true,
        loaded: false,
        error: false,
        errorMessage: '',
        concert: {
        	name: '',
        	date: '',
            id:'',
        	section_bid_summary: {
        		average_price: 0,
        	},
        	cleared_section_bid_summary: {
        		average_price: 0,
        	},
        	ticket_summary: {
        		average_ticket_price: 0,
        	},
        	sold_ticket_summary: {
        		average_sold_ticket_price: 0,
        	},
        	map: {
        		sections: [{name:''}]
        	}
        },
	},
    postTickets: {
        loading: true,
        loaded: false,
        error: false,
        errorMessage: '',
        successMessage: '',
    }
}

var store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
    <div>
        <VendnueNavBar />
        <SellContainer  />
    </div>
    </Provider>
    ,document.getElementById('main'));