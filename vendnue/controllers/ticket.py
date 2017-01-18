from flask_restful import Resource, request
from flask_login import login_required, current_user
from ..models import ticket
from ..utils import *

class Tickets(Resource):
    '''
    URL Endpoint: `/tickets/`
    Allowed methods: POST
    '''

    decorators = [login_required]

    def post(self):
        '''
        POST `/tickets/`
            body:
                concert_id: int
                section_id: int
                price_per_ticket: float
                num_tickets: int
            returns:
                List of new ticket ids
                {'created_tickets': [ <int> ]}
            errors:
                400 - invalid post body keys
                422 - invalid post body values
                500 - unkown model error
        '''
        try:
            concert_id = int(request.form['concert_id'])
            section_id = int(request.form['section_id'])
            price_per_ticket = float(request.form['price_per_ticket'])
            num_tickets = int(request.form['num_tickets'])
        except KeyError:
            return responses.error('The post keys were not correct.', 400)
        except ValueError:
            return responses.error('The post values were not correct.', 422)

        created_tickets = ticket.Ticket.create_tickets(
            concert_id=concert_id,
            section_id=section_id,
            price_per_ticket=price_per_ticket,
            num_tickets=num_tickets
        )

        if 'error' in created_tickets:
            return responses.error(created_ticket_ids['error'], 500)

        created_ticket_ids = map(lambda ticket: ticket.id, created_tickets)
        return responses.success(created_ticket_ids, 201)
