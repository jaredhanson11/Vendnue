import { CALL_API } from 'redux-api-middleware';

// actions for concert api call
const GET_CONCERT_REQUEST = 'GET_CONCERT_REQUEST';
const GET_CONCERT_SUCCESS =  'GET_CONCERT_SUCCESS';
const GET_CONCERT_FAILURE = 'GET_CONCERT_FAILURE';

// actions for social api call
const GET_SOCIAL_REQUEST = 'GET_SOCIAL_REQUEST';
const GET_SOCIAL_SUCCESS = 'GET_SOCIAL_SUCCESS';
const GET_SOCIAL_FAILURE = 'GET_SOCIAL_FAILURE';

const TOGGLE_SECTION = 'TOGGLE_SECTION';


var actionTypes = {
    GET_CONCERT_REQUEST,
    GET_CONCERT_SUCCESS,
    GET_CONCERT_FAILURE,
    GET_SOCIAL_REQUEST,
    GET_SOCIAL_SUCCESS,
    GET_SOCIAL_FAILURE,
    TOGGLE_SECTION
}

function getConcert(concertID) {

    const url = 'http://127.0.0.1:5000/concerts/' + concertID;

    return {
        [CALL_API] : {
            method: 'get',
            endpoint: url,
            headers: {'content-type': 'application/json'},
            types: [GET_CONCERT_REQUEST, GET_CONCERT_SUCCESS, GET_CONCERT_FAILURE]
        }
    }
}

function toggleSection(sectionId) {
    return {
        type: TOGGLE_SECTION,
        section: sectionId
    }
}

var concertActionCreators = {
    toggleSection,
    getConcert
}

export { concertActionCreators, actionTypes };
