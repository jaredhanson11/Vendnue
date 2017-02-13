import { CALL_API } from 'redux-api-middleware';

// actions for concert api call
const GET_CONCERT_REQUEST = 'GET_CONCERT_REQUEST';
const GET_CONCERT_SUCCESS =  'GET_CONCERT_SUCCESS';
const GET_CONCERT_FAILURE = 'GET_CONCERT_FAILURE';

// actions for social api call
const GET_SOCIAL_REQUEST = 'GET_SOCIAL_REQUEST';
const GET_SOCIAL_SUCCESS = 'GET_SOCIAL_SUCCESS';
const GET_SOCIAL_FAILURE = 'GET_SOCIAL_FAILURE';

const SELECT_SECTION = 'SELECT_SECTION';


var actionTypes = {
    GET_CONCERT_REQUEST,
    GET_CONCERT_SUCCESS,
    GET_CONCERT_FAILURE,
    GET_SOCIAL_REQUEST,
    GET_SOCIAL_SUCCESS,
    GET_SOCIAL_FAILURE,
    SELECT_SECTION
}

function getConcert(concertID) {

    const url = 'http://127.0.0.1:5000/concerts/' + concertID;
    console.log(url);

    return {
        [CALL_API] : {
            method: 'get',
            endpoint: url,
            headers: {'content-type': 'application/json'},
            types: [GET_CONCERT_REQUEST, GET_CONCERT_SUCCESS, GET_CONCERT_FAILURE]
        }
    }
}

function selectSection(sectionId) {
    return {
        type: SELECT_SECTION,
        section: sectionId
    }
}

var concertActionCreators = {
    selectSection,
    getConcert
}

export { concertActionCreators, actionTypes };
