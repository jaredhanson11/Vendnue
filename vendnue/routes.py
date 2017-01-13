from . import api
from controllers import auth, user

def add_resources():
    api.add_resource(auth.Signup, '/auth/signup')
    api.add_resource(auth.Login, '/auth/login')
    api.add_resource(auth.Logout, '/auth/logout')
    api.add_resource(user.User, '/user/<int:id>')
