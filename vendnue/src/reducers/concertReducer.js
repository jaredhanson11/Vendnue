import Immutable from 'immutable';
import { actionTypes } from '../actions';

var concertApiCallReducer = function(state={}, action) {
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

var socialApiCallReducer = function(state={}, action) {
    switch (action.type) {
        case actionTypes.GET_SOCIAL_REQUEST:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = true;
            return newState;
        case actionTypes.GET_SOCIAL_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.loading = false;
            newState.loaded = true;
            return newState;
        case actionTypes.GET_SOCIAL_FAILURE:
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

var navBarReducer = function(state={}, action) {
    switch(action.type) {
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};

var titleReducer = function(state={}, action) {
    switch (action.type) {
        case actionTypes.GET_CONCERT_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            const concert = action.payload.concert;
            newState.concertName = concert.name;
            newState.artistsPerforming = concert.artists_performing;
            newState.concertDate = concert.date;
            return newState;
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};

var mapBoxReducer = function(state={}, action) {
    switch(action.type) {
        case actionTypes.GET_CONCERT_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            const concert = action.payload.concert;
            const concertSections = concert.map.sections.map((currSection) => {
                currSection.isActive = false;
                return currSection;
            });
            newState.map = {
                sections: concertSections,
            };
            newState.concertDataSummary = {
                sectionBid: concert.section_bid_summary,
                ticket: concert.ticket_summary,
                soldTicket: concert.sold_ticket_summary
            };
            return newState;
        case actionTypes.TOGGLE_ACTIVE_SECTION:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState.map.sections = newState['map']['sections'].map((currSection)=>{
                if (currSection['id'] == action.section){
                    currSection.isActive = !currSection['isActive'];
                }
                return currSection;
            })
            return newState;
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};

var ticketsBoxReducer = function(state={}, action) {
    switch(action.type) {
        case actionTypes.GET_CONCERT_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            const concert = action.payload.concert;
            const concertSections = concert.map.sections.map((currSection) => {
                currSection.isActive = false;
                return currSection;
            });

            newState.ticketsExchange = {
                sections: concertSections,
            }
            return newState;
        case actionTypes.TOGGLE_ACTIVE_SECTION:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState['ticketsExchange'].sections = newState['ticketsExchange']['sections'].map((currSection)=>{
                if (currSection['id'] == action.section){
                    currSection['isActive'] = !currSection['isActive'];
                }
                return currSection;
            })
            return newState;
        case actionTypes.TOGGLE_HOVER_SECTION:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            newState['ticketsExchange'].sections = newState['ticketsExchange']['sections'].map((currSection)=>{
                if (currSection['id'] == action.section){
                    currSection['isHovered'] = !currSection['isHovered'];
                }
                return currSection;
            })
            return newState;
        default:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            return newState;
    }
};

var socialMediaBoxReducer = function(state={}, action) {
    switch(action.type) {
        case actionTypes.GET_CONCERT_SUCCESS:
            var newState = Immutable.fromJS(state);
            newState = newState.toJS();
            const concert = action.payload.concert;
            newState.concertName = concert.name;
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


