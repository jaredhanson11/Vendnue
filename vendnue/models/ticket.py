from . import db

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
    def create_ticket(concert_id, section_id, price, seller_id):
        new_ticket = Ticket(concert_id=concert_id, section_id=section_id, price=price, seller_id=seller_id)
        db.session.add(new_ticket)
        db.session.flush()
        new_ticket.path_to_tickets = '/' + str(new_ticket.id)
        db.session.add(new_ticket)
        try:
            db.session.commit()
        except IntegrityError:
            return False
        return True
