from . import db
from ..utils import *

class Ticket(db.Model):
    '''
    Ticket model.
    '''
    __tablename__ = 'tickets'
    id = db.Column(db.Integer, primary_key=True)
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))
    price = db.Column(db.Float)
    path_to_tickets = db.Column(db.String(180))
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # concert through backref
    # section through backref

    @staticmethod
    def create_tickets(concert_id, section_id, price_per_ticket, seller_id, num_tickets=1):

        created_tickets = []
        for num_ticket in num_tickets:
            new_ticket = Ticket(concert_id=concert_id, section_id=section_id, price=price_per_ticket, seller_id=seller_id)
            db.session.add(new_ticket)
            db.session.flush()
            new_ticket.path_to_tickets = '/' + str(new_ticket.id)
            db.session.add(new_ticket)
            created_ticket_ids.append(new_ticket)

        try:
            db.session.commit()
        except IntegrityError:
            return model_responses.error('there was an integrity error')

        ret = {
            'tickets_created': created_tickets
        }
        return model_responses.success(ret)
