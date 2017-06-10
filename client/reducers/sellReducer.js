import Immutable from 'immutable';
import { actionTypes } from '../actions';

var concertsApiCallReducer = function(state={}, action) {
    switch (action.type) {
        case actionTypes.GET_CONCERT_SEARCH_REQUEST:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = true;
            return newState;
        case actionTypes.GET_CONCERT_SEARCH_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = false;
            newState.loaded = true;
            newState.concerts = action.payload.concerts;
            return newState;
        case actionTypes.GET_CONCERT_SEARCH_FAILURE:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = false;
            newState.error = true;
            // newState.errorMessage = action.payload.error;
            return newState;
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};

var concertInfoApiCallReducer = function(state={}, action) {
    switch (action.type) {
        case actionTypes.GET_CONCERT_INFO_REQUEST:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = true;
            return newState;
        case actionTypes.GET_CONCERT_INFO_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = false;
            newState.loaded = true;
            newState.concert = action.payload.concert;
            return newState;
        case actionTypes.GET_CONCERT_INFO_FAILURE:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = false;
            newState.error = true;
            // newState.errorMessage = action.payload.error;
            return newState;
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};

var concertQueryReducer = function(state={}, action) {
    switch (action.type) {
        case actionTypes.ENTER_SEARCH_QUERY:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.prefix = action.prefix
            return newState;
        case actionTypes.SEARCH_QUERY_SELECTED:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.selected = true;
            return newState;
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};


export {
    concertsApiCallReducer,
    concertQueryReducer,
    concertInfoApiCallReducer
}