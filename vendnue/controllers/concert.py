from flask_restful import Resource
from ..models import concert
from ..utils import *


class Concerts(Resource):
    '''
    URL Endpoint: `/concerts/`
    Allowed methods: GET
    '''

    def get(self):
        '''
        GET `/concerts/`:
            params:
                None
            returns:
                List of Concert objects
            errors:
                pass
        '''
        concert_objs = concert.Concert.get_concerts_desc().all()
        concerts = map(lambda obj:
                {
                    'concert_id': obj.id,
                    'concert_name': obj.name,
                    'concert_venue': obj.venue.name,
                    'concert_date': obj.date.strftime('%Y-%m-%dT%H:%M:%S')
                }, concert_objs
                )


        data = {'concerts': concerts}
        return responses.success(data, 200)



class Concert(Resource):
    def get(self, concert_id):
        concert_obj = concert.Concert.query.get(concert_id)
        if concert_obj == None:
            return responses.error('The concert you\'re searching for does not exist', 404)
