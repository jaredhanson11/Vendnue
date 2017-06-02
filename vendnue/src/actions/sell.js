import { CALL_API } from 'redux-api-middleware';

// actions for concert api call
const GET_CONCERT_SEARCH_REQUEST = 'GET_CONCERT_SEARCH_REQUEST';
const GET_CONCERT_SEARCH_SUCCESS =  'GET_CONCERT_SEARCH_SUCCESS';
const GET_CONCERT_SEARCH_FAILURE = 'GET_CONCERT_SEARCH_FAILURE';

const GET_CONCERT_INFO_REQUEST = 'GET_CONCERT_INFO_REQUEST';
const GET_CONCERT_INFO_SUCCESS = 'GET_CONCERT_INFO_SUCCESS';
const GET_CONCERT_INFO_FAILURE = 'GET_CONCERT_INFO_FAILURE';

const ENTER_SEARCH_QUERY = 'ENTER_SEARCH_QUERY';
const SEARCH_QUERY_SELECTED = 'SEARCH_QUERY_SELECTED';

var actionTypes = {
    GET_CONCERT_SEARCH_REQUEST,
    GET_CONCERT_SEARCH_SUCCESS,
    GET_CONCERT_SEARCH_FAILURE,
    ENTER_SEARCH_QUERY,
    GET_CONCERT_INFO_REQUEST,
    GET_CONCERT_INFO_SUCCESS,
    GET_CONCERT_INFO_FAILURE,
    SEARCH_QUERY_SELECTED
}

function getConcerts() {

    const url = "http://127.0.0.1:5000/search/bar?query="

    return {
        [CALL_API] : {
            method: 'get',
            endpoint: url,
            types: [GET_CONCERT_SEARCH_REQUEST, GET_CONCERT_SEARCH_SUCCESS, GET_CONCERT_SEARCH_FAILURE]
        }
    }
}

function getConcertInfo(id) {

    const url = "http://127.0.0.1:5000/concerts/" + String(id);

    return {
        [CALL_API] : {
            method: 'get',
            endpoint: url,
            types: [GET_CONCERT_INFO_REQUEST, GET_CONCERT_INFO_SUCCESS, GET_CONCERT_INFO_FAILURE]
        }
    }
}

function concertQuery(query) {
    return {
        type: ENTER_SEARCH_QUERY,
        prefix: query
    }
}

function selectQuery() {
    return {
        type: SEARCH_QUERY_SELECTED,
    }
}

var sellActionCreators = {
    getConcerts,
    concertQuery,
    actionTypes,
    getConcertInfo,
    selectQuery
}

export { sellActionCreators, actionTypes };
