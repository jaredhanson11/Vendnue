import { CALL_API } from 'redux-api-middleware';

const GET_CONCERT_REQUEST = 'GET_CONCERT_REQUEST';
const GET_CONCERT_SUCCESS =  'GET_CONCERT_SUCCESS';
const GET_CONCERT_FAILURE = 'GET_CONCERT_FAILURE';
const SHOW_DATA_MODAL = 'SHOW_DATA_MODAL';

var actionTypes = {
    GET_CONCERT_REQUEST,
    GET_CONCERT_SUCCESS,
    GET_CONCERT_FAILURE,
    SHOW_DATA_MODAL
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

export { getConcert, actionTypes };
