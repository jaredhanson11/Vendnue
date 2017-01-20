from flask import request
from flask_restful import Resource
from flask_login import login_required, current_user
from ..models import user
from ..utils import *

class User(Resource):
    '''
        URL Endpoint: `/users/<int:user_id>`
        Allowed methods: GET
    '''
    decorators = [login_required]

    def get(self, user_id):
        '''
        GET `/users/<int:user_id>`
            body:
                None
            returns:
                user data
                {'email':str, 'first_name':str, 'last_name':str}
            errors:
                403 - permission denied
        '''

        # You can only get the information for your own profile
        if current_user.id != user_id:
            return responses.error('Permission denied', 403)

        data = current_user.get_json()
        return responses.success(data, 200)
