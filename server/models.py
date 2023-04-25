from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from config import db

class DustHead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    reviews = db.relationship('Review', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<DustHead {}>'.format(self.username)


class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), index=True)
    artist = db.Column(db.String(140), index=True)
    genre = db.Column(db.String(140), index=True)
    year = db.Column(db.Integer)
    reviews = db.relationship('Review', backref='record', lazy='dynamic')

    def __repr__(self):
        return '<Record {}>'.format(self.name)


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dust_head.id'))
    record_id = db.Column(db.Integer, db.ForeignKey('record.id'))

    def __repr__(self):
        return '<Review {}>'.format(self.body)