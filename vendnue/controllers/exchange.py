from ..models.section_bid import Section_Bid
from ..models.ticket import Ticket
from ..models.cleared_section_bid import 
from ..models.sold_ticket import 

def section_bid_match(section_obj):
    section_bid_obj_by_price_date = section_obj.bids \
        .order_by(Section_Bid.bid_price_per_ticket.desc()) \
        .order_by(Section_Bid.created_at.asc())

    for section_bid_obj in section_bid_obj_by_price_date:
        ask_price_avg, ticket_ids = get_lowest_ask_by_num_tix(section_bid_obj.num_tickets)
        if section_bid_obj.bid_price_per_ticket >= ask_price_avg:
            

def get_lowest_ask_by_num_tix(num_tix):
    lowest_tickets_prices = Ticket.query.with_entities(Ticket.price, Ticket.id).order_by(Ticket.price.asc()).limit(num_tix).all()
    ticket_ids = []
    ## For num_tix given
    lowest_price_per_ticket = reduce(reduce_price_ids_wrapper(ticket_ids, num_tix), lowest_tickets_prices, 0)
    return lowest_price_per_ticket, ticket_ids

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
