import { CALL_API } from 'redux-api-middleware';

const GET_CONCERT_REQUEST = 'GET_CONCERT_REQUEST';
const GET_CONCERT_SUCCESS =  'GET_CONCERT_SUCCESS';
const GET_CONCERT_FAILURE = 'GET_CONCERT_FAILURE';

var actionTypes = {
    GET_CONCERT_REQUEST,
    GET_CONCERT_SUCCESS,
    GET_CONCERT_FAILURE,
}

function getConcert(concertID) {

    const url = '/api/concerts/' + concertID;
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
