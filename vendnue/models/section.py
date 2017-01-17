from . import db

class Section(db.Model):
    '''
    Section model.
    '''
    __tablename__ = 'sections'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    tickets = db.relationship('Ticket', backref='section', lazy='dynamic')
    bids = db.relationship('Section_Bid', backref='section', lazy='dynamic')
    map_id = db.Column(db.Integer, db.ForeignKey('maps.id'))
    # map through backref get concert through map object
