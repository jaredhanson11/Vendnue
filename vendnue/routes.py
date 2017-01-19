from . import api
from controllers import auth, user, concert, ticket, section_bid, exchange

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

    ### Ticket routes ###
    api.add_resource(ticket.Tickets, '/concerts/<int:concert_id>/sections/<int:section_id>/tickets/')

    ### Section Bid routes ###
    api.add_resource(section_bid.Section_Bids, '/concerts/<int:concert_id>/sections/<int:section_id>/section_bids/')

    api.add_resource(exchange.Exchange, '/exchange')
