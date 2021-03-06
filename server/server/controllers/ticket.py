from flask_restful import Resource, request
from flask_login import login_required, current_user
from ..models import ticket, section, concert
from ..utils import *
from .. import app
import os

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class Tickets(Resource):
    '''
    URL Endpoint: `/concerts/<int:concert_id>/sections/<int:section_id>/tickets/`
    Allowed methods: GET, POST
    '''

    decorators = [login_required]

    def get(self, concert_id, section_id):
        '''
        GET `/concerts/<int:concert_id>/sections/<int:section_id>/tickets/`
            returns:
                list of tickets for the concert and section
                {'tickets': [ <ticket json> ]}
            errors:
                422 - invalid post body values
                404 - resource does not exist
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
            concert_id = int(concert_id)
            section_id = int(section_id)
        except ValueError:
            return responses.error('The post value were not correct.', 422)

        ticket_resp = ticket.Ticket.get_tickets_by_section_id(section_id)
        if 'error' in ticket_resp:
            return responses.error(ticket_resp['error'], 404)
        else:
            ticket_objs = ticket_resp['tickets']
            tickets_list_json = map(lambda tick : tick.get_json(), ticket_objs)
            ret = {
                'tickets' : tickets_list_json
            }
            return responses.success(ret, 200)

    def post(self, concert_id, section_id):
        ''' 
        POST `/concerts/<int:concert_id>/sections/<int:section_id>/tickets/`
            body:
                price_per_ticket: float
                num_tickets: int
            returns:
                List of new ticket ids
                {'created_tickets': [ <int> ]}
            errors:
                400 - invalid post body keys
                404 - resource does not exist
                422 - invalid post body values
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
            concert_id = int(concert_id)
            section_id = int(section_id)
            price_per_ticket = float(request.form['price_per_ticket'])
            num_tickets = int(request.form['num_tickets'])
        except KeyError:
            return responses.error('The post keys were not correct.', 400)
        except ValueError:
            return responses.error('The post values were not correct.', 422)

        seller_id = current_user.id
        created_tickets = ticket.Ticket.create_tickets(
            seller_id=seller_id,
            concert_id=concert_id,
            section_id=section_id,
            price_per_ticket=price_per_ticket,
            num_tickets=num_tickets
        )

        # # check if tickets uploaded
        # if 'file' not in request.files:
        #     return responses.error('Missing ticket files.', 400)
        # file = request.files['file']
        # # if user does not select file, browser also
        # # submit a empty part without filename
        # if file.filename == '':
        #     return responses.error('No selected file.', 400)
        # if file and allowed_file(file.filename):
        #     filename = secure_filename(file.filename)
        #     # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        if 'error' in created_tickets:
            return responses.error(created_tickets['error'], 500)
        created_ticket_objs = created_tickets['tickets_created']
        created_tickets_json = map(lambda ticket_obj: ticket_obj.get_json(), created_ticket_objs)
        data = {
            'tickets_created': created_tickets_json
        }
        return responses.success(data, 201)

class Ticket(Resource):
    '''
    URL Endpoint: `/tickets/<int:ticket_id>`
    Allowed methods: GET
    '''

    decorators = [login_required]

    def get(self, ticket_id):
        '''
        GET `/tickets/<int:ticket_id>`
            returns:
                ticket json
                {'type':str,'id':int,'price':float,'path_to_ticket':str,'seller':json
                'concert':json, 'listed_at':datetime,'section':json}
            errors:
                404 - ticket does not exist
        '''
        ticket_query = ticket.Ticket.get_ticket_by_id(ticket_id)
        if 'error' in ticket_query:
            return responses.error(ticket_query['error'], 404)
        ticket_obj = ticket_query['ticket']

        ret = {'ticket':  ticket_obj.get_json()}
        return responses.success(ret, 200)

