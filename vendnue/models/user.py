from datetime import datetime

import bcrypt

from . import db

class User(db.Model):
    '''
    User model.
    '''
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    email = db.Column(db.String(40))
    password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)
    confirmed = db.Column(db.Boolean, default=False)


    @staticmethod
    def create_user(first_name, last_name, email, plaintext_password):
        hashed_password = User.get_hased_password(plaintext_password)
        new_user = User(first_name=first_name,
                last_name=last_name,
                email=email,
                password_hash=hashed_password
        )
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            return False
        return True

    @staticmethod
    def get_hashed_password(plaintext_password):
        return bcrypt.hashpw(plaintext_password, bcrypt.gensalt(12))

    @staticmethod
    def check_password(plaintext_password, hashed_password):
        return bcrypt.checkpw(plaintext_password, hashed_password)

    @staticmethod
    def get_user_by_email(email_input):
        return User.query.filter_by(email=email_input).first()


