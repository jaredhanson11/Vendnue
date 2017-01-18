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
    api.add_resource(ticket.Tickets, '/tickets/')

    ### Section Bid routes ###
    api.add_resource(section_bid.Section_Bids, '/section_bids/')
    api.add_resource(section_bid.Section_Bid, '/section_bids/<int:section_id>')

    api.add_resource(exchange.Exchange, '/exchange')
