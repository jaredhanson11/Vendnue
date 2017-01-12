from flask import request
from flask_restful import Resource
from ..models import user
from ..utils import *

class Signup(Resource):
    def post(self):
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        plaintext_password = request.form['password']

        user_exists = user.User.get_user_by_email(email)
        if user_exists:
            return responses.error('This email is already in use.', 409)
        else:
            if not user.User.create_user(first_name, last_name, email, plaintext_password):
                return responses.error('There was a server error.', 500)
            else:
                new_user = user.User.get_user_by_email(email)

                # Check that user was properly inserted
                if new_user == None:
                    return responses.error('There was a server error.', 500)
                else:
                    new_user_id = new_user.id
                    data = {'user_id': new_user_id, 'email': email}
                    return responses.success(data, 201)
