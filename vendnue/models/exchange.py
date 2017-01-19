from sqlalchemy.exc import IntegrityError
from section_bid import Section_Bid
from ticket import Ticket

from copy import copy

from cleared_section_bid import Cleared_Section_Bid
from sold_ticket import Sold_Ticket

from . import db

SA_INSTANCE_STATE = '_sa_instance_state'

def get_attributes(obj):
    obj_attr = copy(obj.__dict__)
    obj_attr.pop(SA_INSTANCE_STATE)
    return obj_attr

def create_cleared_section_bid(section_bid_obj):

    section_bid_attr = get_attributes(section_bid_obj)

    if 'section' in section_bid_attr:
        print 'This should never be here'
        print '----------ERROR ERROR ERROR CHECK ME----------------'
        section_bid_attr.pop('section')

    new_cleared_section_bid_obj = Cleared_Section_Bid(**section_bid_attr)
    db.session.add(new_cleared_section_bid_obj)
    db.session.delete(section_bid_obj)

def create_sold_tickets(ticket_ids_list, section_bid_id):
    ticket_objs_list = Ticket.query.filter(Ticket.id.in_(ticket_ids_list)).all()
    for ticket_obj in ticket_objs_list:
        ticket_obj_attr = get_attributes(ticket_obj)
        ticket_obj_attr['cleared_section_bid_id'] = section_bid_id
        new_sold_ticket_obj = Sold_Ticket(**ticket_obj_attr)
        db.session.add(new_sold_ticket_obj)
        db.session.delete(ticket_obj)

# cache stores already searched lowest ask by num tix {num_tix : lowest_ask...}
def match(section_bid_obj, cache):
    num_tickets = section_bid_obj.num_tickets

    if num_tickets not in cache:
        try:
            ask_price_avg, ticket_ids_list = get_lowest_ask_by_num_tix(num_tickets)
        except:
            print 'There were not enough tickets in the db'
            return
        cache[num_tickets] = (ask_price_avg, ticket_ids_list)

    ask_price_avg, ticket_ids_list = cache[num_tickets]

    if section_bid_obj.bid_price_per_ticket >= ask_price_avg:
        create_cleared_section_bid(section_bid_obj)
        create_sold_tickets(ticket_ids_list, section_bid_obj.id)

        try:
            db.session.commit()
        except IntegrityError, e:
            db.session.rollback()
            print 'There was a big no no, ticket wasn\'t sold'
            print e
            ## some sort of critical logging here
        print 'Sold ticket for' + str(section_bid_obj.section.id)
        return

    print 'No tickets were sold'

def section_bid_match(section_obj):
    # queries db for all section bid objects
    # sorted by price and date
    section_bid_obj_by_price_date = section_obj.bids \
        .order_by(Section_Bid.bid_price_per_ticket.desc()) \
        .order_by(Section_Bid.created_at.asc())
    
    # iterate through each section bid object, applying the maching process
    cache = {}
    for section_bid_obj in section_bid_obj_by_price_date:
        match(section_bid_obj, cache)

def get_lowest_ask_by_num_tix(num_tix):
    lowest_tickets_prices = Ticket.query.with_entities(Ticket.price, Ticket.id).order_by(Ticket.price.asc()).limit(num_tix).all()
    if len(lowest_tickets_prices) < num_tix:
        raise Exception
    ticket_ids_list = []
    ## For num_tix given
    lowest_price_per_ticket = reduce(reduce_price_ids_wrapper(ticket_ids_list, num_tix), lowest_tickets_prices, 0)
    return lowest_price_per_ticket, ticket_ids_list

def reduce_price_ids_wrapper(ticket_id_list, num_tix):
    def accum_and_append(last, (price, ticket_id)):
        ticket_id_list.append(ticket_id)
        return last + float(price)/num_tix
    return accum_and_append


from ..models.section import Section
from flask_restful import Resource
class Exchange(Resource):
    def get(self):
        section_bid_match(Section.query.first())
