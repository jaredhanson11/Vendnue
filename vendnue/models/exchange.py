from section_bid import Section_Bid
from ticket import Ticket

from cleared_section_bid import Cleared_Section_Bid
from sold_ticket import Sold_Ticket

from . import db

def section_bid_match(section_obj):
    section_bid_obj_by_price_date = section_obj.bids \
        .order_by(Section_Bid.bid_price_per_ticket.desc()) \
        .order_by(Section_Bid.created_at.asc())

    for section_bid_obj in section_bid_obj_by_price_date:
        ask_price_avg, ticket_ids_list = get_lowest_ask_by_num_tix(section_bid_obj.num_tickets)
        if section_bid_obj.bid_price_per_ticket >= ask_price_avg:
            section_bid_attr = section_bid_obj.__dict__
            ## Getting all the columns/values
            section_bid_attr.pop('_sa_instance_state')
            new_cleared_section_bid_obj = Cleared_Section_Bid(**section_bid_attr)
            db.session.add(new_cleared_section_bid_obj)

            ticket_objs_list = Ticket.query.filter_by(Ticket.id.in_(ticket_ids_list))
            for ticket_obj in ticket_obj_list:
                ticket_obj_attr = ticket_obj.__dict__
                ticket_obj_attr.pop('_sa_instance_state')
                new_sold_ticket_obj = Sold_Ticket(ticket_obj_attr)
                db.session.add(new_sold_ticket_obj)

            try:
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                print 'There was a big no no, ticket wasn\'t sold'
                ## some sort of critical logging here
            print 'Sold ticket for' + str(section_obj.id)
            return

        print 'No tickets were sold'



def get_lowest_ask_by_num_tix(num_tix):
    lowest_tickets_prices = Ticket.query.with_entities(Ticket.price, Ticket.id).order_by(Ticket.price.asc()).limit(num_tix).all()
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
