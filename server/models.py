from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from config import db

class DustHead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    collections = db.relationship('Copy', backref='dusthead', lazy=True)
    followed = db.relationship('Follow',
                                foreign_keys='Follow.follower_id',
                                backref='follower', lazy='dynamic')
    followers = db.relationship('Follow',
                                foreign_keys='Follow.followed_id',
                                backref='followed', lazy='dynamic')
    comments = db.relationship('Comment', backref='dusthead', lazy=True)
    likes = db.relationship('Like', backref='dusthead', lazy=True)

    def follow(self, dusthead):
        if not self.is_following(dusthead):
            f = Follow(follower=self, followed=dusthead)
            db.session.add(f)
            db.session.commit()

    def unfollow(self, dusthead):
        f = self.followed.filter_by(followed_id=dusthead.id).first()
        if f:
            db.session.delete(f)
            db.session.commit()

    def is_following(self, dusthead):
        return self.followed.filter_by(followed_id=dusthead.id).first() is not None

    def followed_collections(self):
        followed = Copy.query.join(Follow, (Follow.followed_id == Copy.dusthead_id)).filter(Follow.follower_id == self.id)
        own = Copy.query.filter_by(dusthead_id=self.id)
        return followed.union(own).order_by(Copy.timestamp.desc())

    def __repr__(self):
        return '<DustHead {}>'.format(self.username)


class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(64), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    copies = db.relationship('Copy', backref='record', lazy=True)

    def __repr__(self):
        return '<Record {}>'.format(self.title)


class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    records = db.relationship('Record', backref='artist', lazy=True)

    def __repr__(self):
        return '<Artist {}>'.format(self.name)


class Copy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    record_id = db.Column(db.Integer, db.ForeignKey('record.id'), nullable=False)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dust_head.id'), nullable=False)
    condition = db.Column(db.String(255))
    liked_by = db.relationship('Like', backref='copy', lazy=True)
    comments = db.relationship('Comment', backref='copy', lazy=True)

    def __repr__(self):
        return '<Copy {}>'.format(self.id)


class Follow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('dust_head.id'))
    followed_id = db.Column(db.Integer, db.ForeignKey('dust_head.id'))

    def __repr__(self):
        return '<Follow {}>'.format(self.id)
    
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dust_head.id'))
    copy_id = db.Column(db.Integer, db.ForeignKey('copy.id'))

    def __repr__(self):
        return '<Comment {}>'.format(self.body)


class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    dusthead_id = db.Column(db.Integer, db.ForeignKey('dust_head.id'))
    copy_id = db.Column(db.Integer, db.ForeignKey('copy.id'))

    def __repr__(self):
        return '<Like {}>'.format(self.id)