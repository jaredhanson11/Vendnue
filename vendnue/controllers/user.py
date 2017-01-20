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
        first_name, last_name, email = request.form['first_name'], request.form['last_name'], request.form['email']
        data = {
            'first_name' : first_name,
            'last_name' : last_name,
            'email' : email
        }
        user_id = current_user.id
        data = user.User.update_user(user_id, data)
        ret = {
            'user' : data
        }
        return responses.success(data, 200)

class Users(Resource):
    '''
        URL Endpoint: `/user/`
        Allowed methods: GET
    '''
    decorators = [login_required]

    def get(self):
        '''
        GET `/users/`
            body:
                None
            returns:
                user data
                {'email':str, 'first_name':str, 'last_name':str}
        '''

        # You can only get the information for your own profile
        user_query = user.User.get_users()
        user_objs = user_query['users']
        user_list_json = map(lambda user_obj: user_obj.get_json(verbose=False), user_objs)
        ret = {
            'users' : user_list_json
        }
        return responses.success(ret, 200)