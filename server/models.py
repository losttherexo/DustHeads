from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import CheckConstraint
from datetime import datetime
from config import db, bcrypt

class DustHead(db.Model, SerializerMixin):
    __tablename__ = 'dustheads'

    serialize_rules = ('-copies.dusthead', '-comments.dusthead', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    bio = db.Column(db.String(280))
    admin = db.Column(db.String, default=False)

    copies = db.relationship('Copy', backref='dusthead', lazy=True, cascade='all, delete')
    comments = db.relationship('Comment', backref='dusthead', lazy=True, cascade='all, delete')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))


class Record(db.Model, SerializerMixin):
    __tablename__ = 'records'

    serialize_rules = ('-copies.record', '-copies.record_id', '-copies.dusthead', '-copies.dusthead_id',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(64), nullable=False)
    artist = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)

    copies = db.relationship('Copy', backref='record', lazy=True)

    @declared_attr
    def __table_args__(cls):
        return (
            CheckConstraint(cls.genre.in_(('Rock', 'Pop', 'Hip-hop/Rap', 'Jazz', 'Classical',
            'Alternative','R&B/Soul', 'Dance/Electronic', 'Indie', 'Soundtrack',
            'World', 'Metal', 'Singer/Songwriter', 'Country/Folk'))),
        )

    def validate_genre(self):
        valid_genres = ('Rock', 'Pop', 'Hip-hop/Rap', 'Jazz', 'Classical',
            'Alternative','R&B/Soul', 'Dance/Electronic', 'Indie', 'Soundtrack',
            'World', 'Metal', 'Singer/Songwriter', 'Country/Folk')
        if self.genre not in valid_genres:
            raise ValueError('Invalid genre')

    __table_args__ = (
        db.UniqueConstraint('title', 'artist', name='_title_artist_uc'),
    )


class Copy(db.Model, SerializerMixin):
    __tablename__ = 'copies'

    serialize_rules = (
        '-dusthead.first_name',
        '-dusthead.last_name',
        '-dusthead._password_hash',
        '-dusthead.id',
        '-dusthead.bio',
        '-record.genre',
        '-record.year',
        '-record.id',
    )

    id = db.Column(db.Integer, primary_key=True)

    description = db.Column(db.String(255))
    image = db.Column(db.String)

    record_id = db.Column(db.Integer, db.ForeignKey('records.id'), nullable=False)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dustheads.id'), nullable=False)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

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
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    dusthead_id = db.Column(db.Integer, db.ForeignKey('dustheads.id'), nullable=False)
    copy_id = db.Column(db.Integer, db.ForeignKey('copies.id'), nullable=False)
