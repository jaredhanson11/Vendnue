from flask_restful import Resource, reqparse
from ..models import concert
from ..utils import *


class Search_Bar(Resource):
    '''
    URL Endpoint: `/search/bar`
    Allowed methods: GET
    '''

    def get(self):
        '''
        GET `/search/bar`
            params:
                query
            returns:
                list of concert objects
                [{'id':int, 'name':str, 'type':str,'date':datetime,'section_bid_summary':json,
                'ticket_summary':json, 'sold_ticket_summary':json}]
            errors:
                404 - resource not found
        '''
        parser = reqparse.RequestParser()
        parser.add_argument('query')
        args = parser.parse_args()
        query = args['query']

        # pass in n? or change here
        concerts_query = concert.Concert.get_top_n_concerts_by_query(query, n=5)
        if 'error' in concerts_query:
            return responses.error(concerts_query['error'], 404) # no resources with that query?
        concert_objs = concerts_query['concerts']
        concerts_list_json = map(lambda concert_obj: concert_obj.get_json(verbose=False), concert_objs)

        ret = {'concerts': concerts_list_json}
        return responses.success(ret, 200)

class Search(Resource):
    '''
    URL Endpoint: `/search`
    Allowed methods: GET
    '''

    def get(self):
        '''
        GET `/search`
            params:
                query
            returns:
                list of concert objects
                [{'id':int, 'name':str, 'type':str,'date':datetime,'section_bid_summary':json,
                'ticket_summary':json, 'sold_ticket_summary':json, 'venue':json, 'artists_performing':json,
                  'sold_tickets':json,'tickets':json, 'section_bids':json}]
            errors:
                404 - resource not found
        '''
        parser = reqparse.RequestParser()
        parser.add_argument('query')
        args = parser.parse_args()
        query = args['query']

        # pass in n? or change here
        concerts_query = concert.Concert.get_top_n_concerts_by_query(query, n=5)
        if 'error' in concerts_query:
            return responses.error(concerts_query['error'], 404) # no resources with that query?
        concert_objs = concerts_query['concerts']
        concerts_list_json = map(lambda concert_obj: concert_obj.get_json(verbose=False), concert_objs)

        ret = {'concerts': concerts_list_json}
        return responses.success(ret, 200)
