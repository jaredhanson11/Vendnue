from datetime import datetime

import bcrypt

from . import db, login_manager
from ..utils import *

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

    ######################## Flask-Login #########################
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_annonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    ####################### End Flask-Login ######################


    @staticmethod
    def create_user(first_name, last_name, email, plaintext_password):
        hashed_password = User.get_hashed_password(plaintext_password)
        new_user = User(first_name=first_name,
                last_name=last_name,
                email=email,
                password_hash=hashed_password
        )
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            return model_responses.error('error':'there was an integrity error')
        return model_responses.success({'user_id':new_user.id})

    @staticmethod
    def get_hashed_password(plaintext_password):
        return bcrypt.hashpw(plaintext_password, bcrypt.gensalt(12))

    @staticmethod
    def check_password(plaintext_password, hashed_password):
        return bcrypt.checkpw(plaintext_password, hashed_password)

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    def set_last_login(self):
        self.last_login = datetime.utcnow()
        db.session.commit()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized():
    return responses.error('No user was logged in.', 401)
