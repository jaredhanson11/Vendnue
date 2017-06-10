import { combineReducers } from 'redux';

import {
    concertApiCallReducer,
    socialApiCallReducer,
    navBarReducer,
    titleReducer,
    mapBoxReducer,
    ticketsBoxReducer,
    socialMediaBoxReducer,
} from './concertReducer.js';

import {
    concertsApiCallReducer,
    concertQueryReducer,
    concertInfoApiCallReducer,
    postTicketsReducer
} from './sellReducer.js';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    concertApiCall: concertApiCallReducer,
    socialApiCall: socialApiCallReducer,
    navBar: navBarReducer,
    title: titleReducer,
    mapBox: mapBoxReducer,
    ticketsBox: ticketsBoxReducer,
    socialMediaBox: socialMediaBoxReducer,
    form: formReducer,
    concertQueryApiCall: concertsApiCallReducer,
    concertQuery: concertQueryReducer,
    concertInfoApiCall: concertInfoApiCallReducer,
});

export { rootReducer };