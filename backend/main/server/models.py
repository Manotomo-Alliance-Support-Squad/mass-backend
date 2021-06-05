from main.server import app, db, ma
from marshmallow import fields

class Gallery(db.Model):
    __tablename__ = 'GALLERY'
    artworkID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    artworkLink = db.Column(db.String(2048), nullable=False)
    artistLink = db.Column(db.String(2048), nullable=True)
    username = db.Column(db.String(64), nullable=True)
    title = db.Column(db.String(64), nullable=True)
    __table_args__ = (db.UniqueConstraint('artworkLink'),
            )

    def __init__(self, artworkLink, username, title, artistLink):
        self.artworkLink = artworkLink
        self.artistLink = artistLink
        self.username = username
        self.title = title

    def __init__(self, data):
        self.artworkLink = data.artworkLink
        self.artistLink = data.artistLink
        self.username = data.username
        self.title = data.title

class GallerySchema(ma.Schema):
    artworkID = fields.Integer()
    artworkLink = fields.String(required=True)
    artistLink = fields.String(required=False)
    username = fields.String(required=True)
    title = fields.String(required=False)


class Games(db.Model):
    __tablename__ = 'GAMES'
    gameID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    gameLink = db.Column(db.String(2048), nullable=False)
    gitLink = db.Column(db.String(2048), nullable=True)
    title = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(256), nullable=True)
    thumbnail = db.Column(db.String(2048), nullable=True)
    __table_args__ = (db.UniqueConstraint('gameLink'),
            )

    def __init__(self, gameLink, gitLink, title, description, thumbnail):
        self.gameLink = gameLink
        self.gitLink = gitLink
        self.title = title
        self.description = description
        self.thumbnail = thumbnail

    def __init__(self, data):
        self.gameLink = data.gameLink
        self.gitLink = data.gitLink
        self.title = data.title
        self.description = data.description
        self.thumbnail = data.thumbnail

class GameSchema(ma.Schema):
    gameID = fields.Integer()
    gameLink = fields.String(required=True)
    gitLink = fields.String(required=False)
    title = fields.String(required=True)
    description = fields.String(required=False)
    thumbnail = fields.String(required=False)


class Message(db.Model):
    __tablename__ = 'MESSAGES'
    messageID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    orig_msg = db.Column(db.String(2048), nullable=False)
    tl_msg = db.Column(db.String(2048), nullable=True)
    country = db.Column(db.String(2), nullable=True)
    username = db.Column(db.String(64), nullable=True)
    __table_args__ = (db.UniqueConstraint('orig_msg'),
            )

    def __init__(self, orig_msg, tl_msg, country, username):
        self.orig_msg = orig_msg
        self.tl_msg = tl_msg
        self.country = country
        self.username = username

    def __init__(self, data):
        self.orig_msg = data.orig_msg
        self.tl_msg = data.tl_msg
        self.country = data.country
        self.username = data.username

class MessageSchema(ma.Schema):
    messageID = fields.Integer()
    orig_msg = fields.String(required=True)
    tl_msg = fields.String(required=False)
    country = fields.String(required=False)
    username = fields.String(required=False)


class Announcement(db.Model):
    __tablename__ = 'ANNOUNCEMENTS'
    announcementID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    message = db.Column(db.String(1024), nullable=False)
    __table_args__ = (db.UniqueConstraint('message'),
            )

    def __init__(self, message):
        self.message = message

    def __init__(self, data):
        self.message = data.message

class AnnouncementSchema(ma.Schema):
    announcementID = fields.Integer()
    message = fields.String(required=True)


class Video(db.Model):
    __tablename__ = 'VIDEOS'
    videoID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    videoLink = db.Column(db.String(2048), nullable=False)
    artistLink = db.Column(db.String(2048), nullable=True)
    username = db.Column(db.String(64), nullable=True)
    title = db.Column(db.String(64), nullable=True)
    __table_args__ = (db.UniqueConstraint('videoLink'),
            )

    def __init__(self, videoLink, username, title, artistLink):
        self.videoLink = videoLink
        self.artistLink = artistLink
        self.username = username
        self.title = title

    def __init__(self, data):
        self.videoLink = data.videoLink
        self.artistLink = data.artistLink
        self.username = data.username
        self.title = data.title

class VideoSchema(ma.Schema):
    videoID = fields.Integer()
    videoLink = fields.String(required=True)
    artistLink = fields.String(required=False)
    username = fields.String(required=True)
    title = fields.String(required=False)
