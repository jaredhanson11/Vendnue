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

const POST_CONCERT_TICKETS_REQUEST = 'POST_CONCERT_TICKETS_REQUEST';
const POST_CONCERT_TICKETS_SUCCESS = 'POST_CONCERT_TICKETS_SUCCESS';
const POST_CONCERT_TICKETS_FAILURE= 'POST_CONCERT_TICKETS_FAILURE';

var actionTypes = {
    GET_CONCERT_SEARCH_REQUEST,
    GET_CONCERT_SEARCH_SUCCESS,
    GET_CONCERT_SEARCH_FAILURE,
    ENTER_SEARCH_QUERY,
    GET_CONCERT_INFO_REQUEST,
    GET_CONCERT_INFO_SUCCESS,
    GET_CONCERT_INFO_FAILURE,
    SEARCH_QUERY_SELECTED,
    POST_CONCERT_TICKETS_REQUEST,
    POST_CONCERT_TICKETS_SUCCESS,
    POST_CONCERT_TICKETS_FAILURE
}

const API_URL = "http://127.0.0.1:8080/api/"

function getConcerts() {

    const url = API_URL+"search/bar?query="

    return {
        [CALL_API] : {
            method: 'get',
            endpoint: url,
            types: [GET_CONCERT_SEARCH_REQUEST, GET_CONCERT_SEARCH_SUCCESS, GET_CONCERT_SEARCH_FAILURE]
        }
    }
}

function getConcertInfo(id) {

    const url = API_URL+"concerts/" + String(id);

    return {
        [CALL_API] : {
            method: 'get',
            endpoint: url,
            types: [GET_CONCERT_INFO_REQUEST, GET_CONCERT_INFO_SUCCESS, GET_CONCERT_INFO_FAILURE]
        }
    }
}

function postConcertTickets(concertId, sectionId, numberOfTickets, priceOfTickets) {
    
    // console.log(ticketFiles);


    const url = API_URL+"concerts/"+String(concertId)+"/sections/"+String(sectionId)+"/tickets/"
    console.log(url);

    return {
        [CALL_API] : {
            method: 'post',
            endpoint: url,
            body: {
                price_per_ticket:priceOfTickets,
                num_tickets:numberOfTickets,
            },
            types: [POST_CONCERT_TICKETS_REQUEST, POST_CONCERT_TICKETS_SUCCESS, POST_CONCERT_TICKETS_FAILURE],
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
    selectQuery,
    postConcertTickets
}

export { sellActionCreators, actionTypes };
