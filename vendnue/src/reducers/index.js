import { combineReducers } from 'redux';

import {
    concertApiCallReducer,
    socialApiCallReducer,
    navBarReducer,
    titleReducer,
    mapBoxReducer,
    ticketsBoxReducer,
    socialMediaBoxReducer
} from './concertReducer.js';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    concertApiCall: concertApiCallReducer,
    socialApiCall: socialApiCallReducer,
    navBar: navBarReducer,
    title: titleReducer,
    mapBox: mapBoxReducer,
    ticketsBox: ticketsBoxReducer,
    socialMediaBox: socialMediaBoxReducer,
    form: formReducer
});

export { rootReducer };
