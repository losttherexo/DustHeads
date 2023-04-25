from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from config import db

class DustHead(db.Model, SerializerMixin):
    __tablename__ = 'dustheads'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    first_name = db.Column(db.String(32), nullable=False)
    last_name = db.Column(db.String(32))
    bio = db.Column(db.String(280))

    copies = db.relationship('Copy', backref='dusthead', lazy=True)
    comments = db.relationship('Comment', backref='dusthead', lazy=True)

class Record(db.Model, SerializerMixin):
    __tablename__ = 'records'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(64), nullable=False)
    artist = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)

    copies = db.relationship('Copy', backref='record', lazy=True)


class Copy(db.Model, SerializerMixin):
    __tablename__ = 'copies'

    id = db.Column(db.Integer, primary_key=True)

    description = db.Column(db.String(255))
    image = db.Column(db.String)

    record_id = db.Column(db.Integer, db.ForeignKey('records.id'), nullable=False)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dustheads.id'), nullable=False)

    comments = db.relationship('Comment', backref='copy', lazy=True)



class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(280), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    dusthead_id = db.Column(db.Integer, db.ForeignKey('dustheads.id'), nullable=False)
    copy_id = db.Column(db.Integer, db.ForeignKey('copies.id'), nullable=False)