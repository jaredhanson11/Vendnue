import { getConcert } from './concert.js';

var actionCreators = {
    getConcert
}

var actionTypes = {
    GET_CONCERT_REQUEST: 'GET_CONCERT_REQUEST',
    GET_CONCERT_SUCCESS: 'GET_CONCERT_SUCCESS',
    GET_CONCERT_FAILUREL 'GET_CONCERT_FAILURE'
}

export { actionCreators, actionTypes }
