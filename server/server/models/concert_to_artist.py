from . import db

concerts_to_artists = db.Table('concerts_to_artists',
    db.Column('artist_id', db.Integer, db.ForeignKey('artists.id')),
    db.Column('concert_id', db.Integer, db.ForeignKey('concerts.id'))
)
