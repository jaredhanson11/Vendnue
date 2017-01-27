from . import api
from controllers import auth, user, concert, ticket, section_bid, artist, search

def add_resources():
    ### Auth routes ###
    api.add_resource(auth.Signup, '/auth/signup')
    api.add_resource(auth.Login, '/auth/login')
    api.add_resource(auth.Logout, '/auth/logout')

    ### User routes ###
    api.add_resource(user.User, '/user/')
    api.add_resource(user.Users, '/users/')

    ### Concert routes ###
    api.add_resource(concert.Concerts, '/concerts/')
    api.add_resource(concert.Concert, '/concerts/<int:concert_id>')

    ### Ticket routes ###
    api.add_resource(ticket.Tickets, '/concerts/<int:concert_id>/sections/<int:section_id>/tickets/')
    api.add_resource(ticket.Ticket, '/tickets/<int:ticket_id>')

    ### Section Bid routes ###
    api.add_resource(section_bid.Section_Bids, '/concerts/<int:concert_id>/sections/<int:section_id>/section_bids/')
    api.add_resource(section_bid.Section_Bid, '/section_bids/<int:section_bid_id>')

    ### Artist routes ###
    api.add_resource(artist.Artist, '/artists/<int:artist_id>')
    api.add_resource(artist.Artists, '/artists/')

    ### Search routes ###
    api.add_resource(search.Search_Bar, '/search/bar')
    api.add_resource(search.Search, '/search')
