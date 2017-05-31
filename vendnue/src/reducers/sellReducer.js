import Immutable from 'immutable';
import { actionTypes } from '../actions';

var concertsApiCallReducer = function(state={}, action) {
    switch (action.type) {
        case actionTypes.GET_CONCERT_REQUEST:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = true;
            return newState;
        case actionTypes.GET_CONCERT_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = false;
            newState.loaded = true;
            return newState;
        case actionTypes.GET_CONCERT_FAILURE:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = false;
            newState.error = true;
            newState.errorMessage = action.payload.error;
            return newState;
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};

export {
    concertApiCallReducer,
    socialApiCallReducer,
    navBarReducer,
    titleReducer,
    mapBoxReducer,
    ticketsBoxReducer,
    socialMediaBoxReducer
}