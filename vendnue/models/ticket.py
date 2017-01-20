from sqlalchemy.exc import IntegrityError
from datetime import datetime

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
    path_to_ticket = db.Column(db.String(180))
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listed_at = db.Column(db.DateTime, default=datetime.utcnow)
    # seller through users backref
    # concert through backref
    # section through backref

    @staticmethod
    def create_tickets(concert_id, section_id, price_per_ticket, seller_id, num_tickets=1):

        created_tickets = []
        for _ in range(num_tickets):
            new_ticket = Ticket(
                    concert_id=concert_id,
                    section_id=section_id,
                    price=price_per_ticket,
                    seller_id=seller_id
                )
            db.session.add(new_ticket)
            db.session.flush()
            new_ticket.path_to_ticket = '/' + str(new_ticket.id)
            db.session.add(new_ticket)
            created_tickets.append(new_ticket)

        try:
            db.session.commit()
        except IntegrityError:
            return model_responses.error('there was an integrity error')

        ret = {
            'tickets_created': created_tickets
        }
        return model_responses.success(ret)

    def get_json(verbose=True):
        ret = {
                'ticket_id': self.id,
                'ticket_price': self.price
            }

        if verbose:
            ret.update({
                'ticket_path_to_ticket': self.path_to_ticket,
                'ticket_seller': self.seller.get_json(verbose=False),
                'ticket_listed_at': self.listed_at,
                'ticket_concert': self.concert.get_json(verbose=False),
                'ticket_section': self.section.get_json(verbose=False)
            })

        return ret
