from flask import request
from flask_restful import Resource
from flask_login import login_required, current_user
from ..models import user
from ..utils import *

class User(Resource):
    decorators = [login_required]

    def get(self, user_id):
        # You can only get the information for your own profile
        if current_user.id != user_id:
            return responses.error('Permission denied', 403)

        user_data = {
                'email': current_user.email,
                'first_name': current_user.first_name,
                'last_name': current_user.last_name
            }

        return responses.success(user_data, 200)
