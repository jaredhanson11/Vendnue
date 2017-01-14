from . import api
from controllers import auth, user, concert

def add_resources():
    ### Auth routes ###
    api.add_resource(auth.Signup, '/auth/signup')
    api.add_resource(auth.Login, '/auth/login')
    api.add_resource(auth.Logout, '/auth/logout')

    ### User routes ###
    api.add_resource(user.User, '/users/<int:user_id>')

    ### Concert routes ###
    api.add_resource(concert.Concerts, '/concerts/')
    api.add_resource(concert.Concert, '/concerts/<int:concert_id>')
