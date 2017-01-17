from . import db

class Map(db.Model):
    '''
    Map model.
    '''
    __tablename__ = 'maps'
    id = db.Column(db.Integer, primary_key=True)
    path_to_map = db.Column(db.String(250))
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id'))
    # concert object through backref in concerts
    sections = db.relationship('Section', backref='map', lazy='dynamic')
