import { CALL_API } from 'redux-api-middleware';

// actions for concert api call
const GET_CONCERT_SEARCH_REQUEST = 'GET_CONCERT_NAMES_REQUEST';
const GET_CONCERT_SEARCH_SUCCESS =  'GET_CONCERT_NAMES_SUCCESS';
const GGET_CONCERT_SEARCH_FAILURE = 'GGET_CONCERT_NAMES_FAILURE';

var actionTypes = {
    GET_CONCERT_SEARCH_REQUEST,
    GET_CONCERT_SEARCH_SUCCESS,
    GGET_CONCERT_SEARCH_FAILURE,
}

function getConcerts(prefix) {

    const url = 'http://127.0.0.1:5000/search/bar' + prefix;

    return {
        [CALL_API] : {
            method: 'get',
            endpoint: url,
            headers: {'content-type': 'application/json'},
            types: [GET_CONCERT_SEARCH_REQUEST, GET_CONCERT_SEARCH_SUCCESS, GET_CONCERT_SEARCH_FAILURE
        }
    }
}

var sellActionCreators = {
    getConcerts,
    actionTypes,
}