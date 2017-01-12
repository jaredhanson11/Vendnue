from . import api
from controllers import auth

def add_resources():
    api.add_resource(auth.Signup, '/auth/signup')
