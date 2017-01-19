import requests
Session = requests.Session
url = 'http://127.0.0.1:5000'

def login(email='jred0011@gmail.com', password='password'):
    session = Session()
    data = {
        'email': 'jred0011@gmail.com',
        'password': 'password'
    }
    response = session.post(url + '/auth/login', data=data)
    print response.json()
    assert(response.status_code==200)
    return session

def signup(email, first, last):
    data = {
        'first_name': first,
        'last_name': last,
        'email': email,
        'password': 'password'
    }
    response = requests.post(url + '/auth/signup', data=data)
    print response.json()
    assert(response.status_code==201)

def place_section_bid(session, concert_id, section_id, num_tickets, bid_price_per_ticket):
    data = {
            'concert_id' : concert_id,
            'section_id' : section_id,
            'num_tickets' : num_tickets,
            'bid_price_per_ticket' : bid_price_per_ticket
            }
    response = session.post(url+ '/concerts/' + str(concert_id) + '/sections/' + str(section_id) + '/section_bids/', data=data)
    print response.json()
    assert(response.status_code == 200)

def get_section_bids(session, concert_id, section_id):
    response = session.get(url+'/concerts/' + str(concert_id) + '/sections/' + str(section_id) + '/section_bids/')
    print response.json()
    assert(response.status_code == 200)
