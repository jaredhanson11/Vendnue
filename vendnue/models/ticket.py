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
