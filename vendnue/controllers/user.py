from flask import request
from flask_restful import Resource
from flask_login import login_required, current_user
from ..models import user
from ..utils import *

class User(Resource):
    '''
        URL Endpoint: `/user/`
        Allowed methods: GET
    '''
    decorators = [login_required]

    def get(self):
        '''
        GET `/user/`
            body:
                None
            returns:
                user data
                {'email':str, 'first_name':str, 'last_name':str}
        '''

        # You can only get the information for your own profile
        data = {
            'user' : current_user.get_json()
        }
        return responses.success(data, 200)

    def put(self):
        '''
        PUT `/user/`
            body:
                {'first_name':str, 'last_name':str, 'email':str}
            returns:
                changed user data
                {'email':str, 'first_name':str, 'last_name':str}
            errors:
                403 - permission denied
        '''
        try:
            first_name = request.form['first_name']
            last_name = request.form['last_name']
            email = request.form['email']
        except KeyError:
            return responses.error('The key values are incorrect.')

        data = {
            'first_name' : first_name,
            'last_name' : last_name,
            'email' : email
        }
        user_id = current_user.id
        updated_user_query = user.User.update_user(user_id, data)

        if 'error' in updated_user_query:
            return responses.error('There was an error updating profile.', 400)

        ret = {
            'user' : current_user.get_json()
        }
        return responses.success(ret, 200)

# users
