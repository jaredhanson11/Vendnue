import { CALL_API } from 'redux-api-middleware';

function getConcert(concertID) {

    const url = '/api/concerts/' + concertID;
    console.log(url);

    return {
        [CALL_API] : {
            method: 'get',
            endpoint: url
            headers: {'content-type': 'application/json'},
            types: ['CONCERT_REQUEST', 'CONCERT_SUCCESS', 'CONCERT_FAILURE']
        }
    }
}

export { getConcert };
