from flask_restful import Resource, reqparse
from flask import request
from ..models import section_bid, exchange, concert, section
from ..utils import *
from flask_login import login_required, current_user

class Section_Bids(Resource):
    '''
    URL Endpoint: `/concerts/<int:concert_id>/sections/<int:section_id>/section_bids/`
    Allowed methods: POST
    '''

    decorators = [login_required]

    def post(self, concert_id, section_id):
        '''
        POST `/concerts/<int:concert_id>/sections/<int:section_id>/section_bids/`:
            body:
                num_tickets: int
                bid_price_per_ticket: float
            returns:
                section bid ids
            errors:
                400 - key error for invalid body param names
                422 - value error for invalid typecasting
                500 - server error in processing section bid creations
        '''
        # assert that section_id, and concert_id exist
        # assert that the section_id and concert_id are related
        assert_msg = ''
        section_resp = section.Section.get_section_by_id(section_id)
        if 'error' in section_resp:
            assert_msg += section_resp['error'] + '\n'
        concert_resp = concert.Concert.get_concert_by_id(concert_id)
        if 'error' in concert_resp:
            assert_msg += concert_resp['error']
        if len(assert_msg) > 0:
            return responses.error(assert_msg, status_code=404)
        else:
            # we know the section, concert exist
            # check if related
            section_obj = section_resp['section']
            if not section_obj.is_related_to_concert_with_id(concert_id):
                return responses.error('The section and concert are not related.', status_code=404)

        try:
            bidder_id = current_user.id
            concert_id = int(concert_id)
            section_id = int(section_id)
            num_tickets = int(request.form['num_tickets'])
            bid_price_per_ticket = float(request.form['bid_price_per_ticket'])
        except KeyError:
            return responses.error('The post keys were not corect.', 400)
        except ValueError:
            return responses.error('The post values were not correct.', 422)

        new_section_bid = section_bid.Section_Bid.create_section_bid(
            bidder_id=bidder_id,
            concert_id=concert_id,
            section_id=section_id,
            num_tickets=num_tickets,
            bid_price_per_ticket=bid_price_per_ticket
        )

        if 'error' in new_section_bid:
            return responses.error(new_section_bid['error'], 500)
        else:
            section_bid_obj = new_section_bid['section_bid']
            new_section_bid = {
                'bidder_id' : section_bid_obj.bidder_id,
                'concert_id' : section_bid_obj.concert_id,
                'section_id': section_bid_obj.section_id,
                'num_tickets' : section_bid_obj.num_tickets,
                'bid_price_per_ticket' : section_bid_obj.bid_price_per_ticket
            }

            data = {
                'section_bid': new_section_bid
            }

            exchange.section_bid_match(section_bid_obj.section)

            return responses.success(data, 200)


    def get(self, concert_id, section_id):
        '''
        GET `/concerts/<int:concert_id>/sections/<int:section_id>/section_bids/`
        params:
            None
        returns:
            list of section bids for a particular section_id
        errors:
            500 - server error in processing the querying of section bids
        '''

        # assert that section_id, and concert_id exist
        # assert that the section_id and concert_id are related
        assert_msg = ''
        section_resp = section.Section.get_section_by_id(section_id)
        if 'error' in section_resp:
            assert_msg += section_resp['error'] + '\n'
        concert_resp = concert.Concert.get_concert_by_id(concert_id)
        if 'error' in concert_resp:
            assert_msg += concert_resp['error']
        if len(assert_msg) > 0:
            return responses.error(assert_msg, status_code=404)
        else:
            # we know the section, concert exist
            # check if related
            section_obj = section_resp['section']
            if not section_obj.is_related_to_concert_with_id(concert_id):
                return responses.error('The section and concert are not related.', status_code=404)

        section_bid_objs = section_bid.Section_Bid.get_section_bids(section_id)
        if 'error' in section_bid_objs:
            return responses.error(section_bid_objs['error'], 500)
        else:
            section_bids = map(lambda sb : sb.get_json(), section_bid_objs['section_bids'])
            data = {
                'section_bids': section_bids
            }
            return responses.success(data, 200)

class Section_Bid(Resource):
    '''
    URL Endpoint: `/section_bids/<int:section_bid_id>`
    Allowed methods: GET
    '''

    decorators = [login_required]

    def get(self, section_bid_id):
        '''
        GET `/section_bids/<int:section_bid_id>`:
            returns:
                section bid information
                {'id': str, 'bid_price_per_ticket':float, 'num_tickets':int, 'bid_price_total':float
                'type': str, 'created_at':datetime, 'concert':json, 'section':json, 'bidder':json}
            errors:
                400 - key error for invalid body param names
                422 - value error for invalid typecasting
                500 - server error in processing section bid creations
        '''
        section_bid_query = section_bid.Section_Bid.get_section_bid_by_id(section_bid_id)
        if 'error' in section_bid_query:
            return responses.error(section_bid_query['error'], 404)
        section_bid_obj = section_bid_query['section_bid']
        ret = {'section_bid':  section_bid_obj.get_json()}
        return responses.success(ret, 200)



