from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from config import db, bcrypt

class DustHead(db.Model, SerializerMixin):
    __tablename__ = 'dustheads'

    serialize_rules = ('-copies', '-comments')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    password_confirmation = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    bio = db.Column(db.String(280))

    copies = db.relationship('Copy', backref='dusthead', lazy=True)
    comments = db.relationship('Comment', backref='dusthead', lazy=True)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Record(db.Model, SerializerMixin):
    __tablename__ = 'records'

    serialize_rules = ('-copies',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(64), nullable=False)
    artist = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)

    copies = db.relationship('Copy', backref='record', lazy=True)


class Copy(db.Model, SerializerMixin):
    __tablename__ = 'copies'

    serialize_rules = (
        '-comments',
        '-dusthead.first_name',
        '-dusthead.last_name',
        '-dusthead.id',
        '-dusthead.bio',
        '-record.genre',
        '-record.year',
        '-record.image',
        '-record.id',
    )

    id = db.Column(db.Integer, primary_key=True)

    description = db.Column(db.String(255))
    image = db.Column(db.String)

    record_id = db.Column(db.Integer, db.ForeignKey('records.id'), nullable=False)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dustheads.id'), nullable=False)

    comments = db.relationship('Comment', backref='copy', lazy=True)



class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    serialize_rules = (
        '-copy',
        '-dusthead.bio',
        '-dusthead.first_name',
        '-dusthead.last_name',
        '-dusthead.id'
    )

    id = db.Column(db.Integer, primary_key=True)
    
    body = db.Column(db.String(280), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    dusthead_id = db.Column(db.Integer, db.ForeignKey('dustheads.id'), nullable=False)
    copy_id = db.Column(db.Integer, db.ForeignKey('copies.id'), nullable=False)