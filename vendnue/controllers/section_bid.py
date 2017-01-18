from flask_restful import Resource, reqparse
from flask import request
from ..models import section_bid
from ..utils import *
from flask_login import login_required, current_user


class Section_Bids(Resource):
    '''
    URL Endpoint: `/section_bids/`
    Allowed methods: POST
    '''
    
    decorators = [login_required]

    def post(self):
        '''
        POST `/section_bids/`:
            body:
                concert_id: int
                section_id: int
                num_tickets: int
                bid_price_per_ticket: float
            returns:
                section bid ids
            errors:
                400 - key error for invalid body param names
                422 - value error for invalid typecasting
                500 - server error in processing section bid creations
        '''
        try:
            bidder_id = current_user.id
            concert_id = int(request.form['concert_id'])
            section_id = int(request.form['section_id'])
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
            print new_section_bid
            print type(section_bid_obj)
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

            return responses.success(data, 200)


class Section_Bid(Resource):
    '''
    URL Endpoint: '/section_bids/<int:section_id>'
    Allowed methods: GET
    '''

    decorators = [login_required]

    def get(self, section_id):
        '''
        GET '/section_bids/<int:section_id>'
        params:
            None
        returns:
            list of section bids for a particular section_id
        errors:
            500 - server error in processing the querying of section bids
            
        '''
        section_bid_objs = section_bid.Section_Bid.get_section_bids(section_id)
        if 'error' in section_bid_objs:
            return responses.error(section_bid_objs['error'], 500)
        else:
            section_bids = map(lambda sb :
                    {
                        'bidder_id' : sb.bidder_id,
                        'concert_id' : sb.concert_id,
                        'bid_price_per_ticket' : sb.bid_price_per_ticket,
                        'num_tickets' : sb.num_tickets
                    }, section_bid_objs['section_bids']
                )
            data = {
                    'section_bids': section_bids
                    }
            return responses.success(data, 200)
