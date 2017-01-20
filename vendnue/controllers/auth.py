from flask import request
from flask_restful import Resource
from flask_login import login_required, login_user, logout_user, current_user
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
                    ret = {
                        'user': new_user.get_json()
                    }
                    return responses.success(ret, 201)


class Login(Resource):
    def post(self):
        email = str(request.form['email'])
        plaintext_password = str(request.form['password'])

        user_exists = user.User.get_user_by_email(email)
        if user_exists:
            # now check if email and password combination in exist
            actual_password = user_exists.password_hash
            passwords_match = user.User.check_password(plaintext_password, actual_password)
            if passwords_match:
                user_id = user_exists.id
                user_exists.set_last_login()
                login_user(user_exists)

                ret = {
                    'user': user_exists.get_json()
                }
                return responses.success(ret,200)
            else:
                return responses.error('The email and password do not match.', 422)
        else:
            return responses.error('This email is not in use.', 404)


class Logout(Resource):
    decorators = [login_required]
    def get(self):
        logout_user()
        ret = {'message': 'Successfully logged out.'}
        return responses.success(ret, 200)
