import Immutable from 'immutable';
import { actionTypes } from '../actions';

export {
    concertApiCallReducer,
    socialApiCallReducer,
    navBarReducer,
    titleReducer,
    mapBoxReducer,
    ticketsBoxReducer,
    socialMediaBoxReducer
}

var concertReducer = function(state={}, action) {
    switch (action.type) {
        case actionTypes.GET_CONCERT_REQUEST:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            console.log('LOADING.....');
            newState.isLoading = true;
            return newState;
        case actionTypes.GET_CONCERT_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            console.log('SUCCESS!!')
            newState.isLoading = false;
            console.log('--------------');
            console.log(action);
            const payload  = action.payload;
            newState.payload = payload;
            newState.isLoaded = true;
            console.log(newState);
            return newState;
        case actionTypes.GET_CONCERT_FAILURE:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            console.log('FAILED');
            newState.isLoading = false;
            newState.error = action.payload;
            return newState;
        case actionTypes.SHOW_DATA_MODAL:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            console.log('show data');
            newState.showDataModal = true;
            newState.activeModal = action.activeModal;
            return newState;
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};

export { concertReducer };
