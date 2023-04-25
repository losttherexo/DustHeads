from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db

class DustHead(db.Model, SerializerMixin):
    __tablename__ = 'dustheads'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), nullable = False)
    first_name = db.Column(db.String, nullable = False)


    copies = db.relationship('Copy', backref='dusthead', lazy=True)
    follows = db.relationship('Follow', foreign_keys='Follow.follower_id', backref='follower', lazy='dynamic', cascade='all, delete-orphan')
    followed_by = db.relationship('Follow', foreign_keys='Follow.followed_id', backref='followed', lazy='dynamic', cascade='all, delete-orphan')
    comments = db.relationship('Comment', backref='dusthead', lazy=True)

class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    records = db.relationship('Record', backref='artist', lazy=True)

class Record(db.Model, SerializerMixin):
    __tablename__ = 'records'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    copies = db.relationship('Copy', backref='record', lazy=True)

class Copy(db.Model, SerializerMixin):
    __tablename__ = 'copies'

    id = db.Column(db.Integer, primary_key=True)
    likes = db.relationship('Like', backref='copy', lazy=True)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dusthead.id'), nullable=False)
    record_id = db.Column(db.Integer, db.ForeignKey('record.id'), nullable=False)
    

class Follow(db.Model, SerializerMixin):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('dusthead.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('dusthead.id'), nullable=False)

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255))
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dusthead.id'), nullable=False)
    copy_id = db.Column(db.Integer, db.ForeignKey('copy.id'), nullable=False)

class Like(db.Model, SerializerMixin):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dusthead.id'), nullable=False)
    copy_id = db.Column(db.Integer, db.ForeignKey('copy.id'), nullable=False)
