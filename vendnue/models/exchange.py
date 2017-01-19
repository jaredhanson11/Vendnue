from sqlalchemy.exc import IntegrityError
from section_bid import Section_Bid
from ticket import Ticket

from copy import copy

from cleared_section_bid import Cleared_Section_Bid
from sold_ticket import Sold_Ticket

from . import db

SA_INSTANCE_STATE = '_sa_instance_state'

def section_bid_match(section_obj):
    # queries db for all section bid objects
    # sorted by price and date
    section_bid_obj_by_price_date = section_obj.bids \
        .order_by(Section_Bid.bid_price_per_ticket.desc()) \
        .order_by(Section_Bid.created_at.asc())
    
    # iterate through each section bid object, applying the maching process
    # save to cache the number of tickets for bids that did not fill
    # bids that come later in the interation are strictly worse and will thus be ignored
    cache = {}
    for section_bid_obj in section_bid_obj_by_price_date:
        __match__(section_bid_obj, cache)

# cache stores already searched lowest ask by num tix {num_tix : lowest_ask...}
def __match__(section_bid_obj, cache):
    num_tickets = section_bid_obj.num_tickets

    # if a better bid did not fill, this worse bid will not fill either
    if num_tickets in cache:
        return

    try:
        ask_price_avg, ticket_ids_list = __get_lowest_ask_by_num_tix__(num_tickets)
    except:
        print 'There were not enough tickets in the db'
        return

    if section_bid_obj.bid_price_per_ticket >= ask_price_avg:
        __create_cleared_section_bid__(section_bid_obj)
        __create_sold_tickets__(ticket_ids_list, section_bid_obj.id)

        try:
            db.session.commit()
        except IntegrityError, e:
            db.session.rollback()
            print 'There was a big no no, ticket wasn\'t sold'
            print e
            ## some sort of critical logging here
        print 'Sold ticket for' + str(section_bid_obj.section.id)
        return

    cache[num_tickets] = (ask_price_avg, ticket_ids_list)
    print 'No tickets were sold'

def __get_lowest_ask_by_num_tix__(num_tix):
    lowest_tickets_prices = Ticket.query.with_entities(Ticket.price, Ticket.id).order_by(Ticket.price.asc()).limit(num_tix).all()
    if len(lowest_tickets_prices) < num_tix:
        raise Exception
    ticket_ids_list = []
    ## For num_tix given
    lowest_price_per_ticket = reduce(__reduce_price_ids_wrapper__(ticket_ids_list, num_tix), lowest_tickets_prices, 0)
    return lowest_price_per_ticket, ticket_ids_list

def __reduce_price_ids_wrapper__(ticket_id_list, num_tix):
    def accum_and_append(last, (price, ticket_id)):
        ticket_id_list.append(ticket_id)
        return last + float(price)/num_tix
    return accum_and_append

def __create_cleared_section_bid__(section_bid_obj):

    section_bid_attr = __get_attributes__(section_bid_obj)

    if 'section' in section_bid_attr:
        print 'This should never be here'
        print '----------ERROR ERROR ERROR CHECK ME----------------'
        section_bid_attr.pop('section')

    new_cleared_section_bid_obj = Cleared_Section_Bid(**section_bid_attr)
    db.session.add(new_cleared_section_bid_obj)
    db.session.delete(section_bid_obj)

def __create_sold_tickets__(ticket_ids_list, section_bid_id):

    ticket_objs_list = Ticket.query.filter(Ticket.id.in_(ticket_ids_list)).all()

    for ticket_obj in ticket_objs_list:
        ticket_obj_attr = __get_attributes__(ticket_obj)
        ticket_obj_attr['cleared_section_bid_id'] = section_bid_id
        new_sold_ticket_obj = Sold_Ticket(**ticket_obj_attr)
        db.session.add(new_sold_ticket_obj)
        db.session.delete(ticket_obj)

def __get_attributes__(obj):
    obj_attr = copy(obj.__dict__)
    obj_attr.pop(SA_INSTANCE_STATE)
    return obj_attr
