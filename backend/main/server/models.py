from main.server import app, db, ma
from marshmallow import fields


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password


class Gallery(db.Model):
    __tablename__ = 'GALLERY'
    artworkID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    artworkLink = db.Column(db.String(2048), nullable=False)
    artistLink = db.Column(db.String(2048), nullable=True)
    username = db.Column(db.String(64), nullable=True)
    title = db.Column(db.String(64), nullable=True)

    def __init__(self, artworkLink, username, title, artistLink):
        self.artworkLink = artworkLink
        self.artistLink = artistLink
        self.username = username
        self.title = title


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

    def __init__(self, gameLink, gitLink, title, description, thumbnail):
        self.gameLink = gameLink
        self.gitLink = gitLink
        self.title = title
        self.description = description
        self.thumbnail = thumbnail


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

    def __init__(self, orig_msg, tl_msg, country, username):
        self.orig_msg = orig_msg
        self.tl_msg = tl_msg
        self.country = country
        self.username = username


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

    def __init__(self, message):
        self.message = message


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

    def __init__(self, videoLink, username, title, artistLink):
        self.videoLink = videoLink
        self.artistLink = artistLink
        self.username = username
        self.title = title


class VideoSchema(ma.Schema):
    videoID = fields.Integer()
    videoLink = fields.String(required=True)
    artistLink = fields.String(required=False)
    username = fields.String(required=True)
    title = fields.String(required=False)


# TODO add Message + translated message
class MultiGallery(db.Model):
    __tablename__ = 'MULTIGALLERY'
    artworkID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    setID = db.Column(db.Integer, db.ForeignKey('SETMETADATA.setID'), nullable=False)
    setmetadata = db.relationship("SetMetadata")
    artworkLink = db.Column(db.String(2048), nullable=False)
    message = db.Column(db.String(2048), nullable=False)

    def __init__(
            self,
            setID,
            artworkLink,
            message,
    ):
        self.setID = setID
        self.artworkLink = artworkLink
        self.message = message


class SetMetadata(db.Model):
    __tablename__ = 'SETMETADATA'
    metadataID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    setID = db.Column(db.String(32), nullable=False)
    artistLink = db.Column(db.String(2048), nullable=True)
    username = db.Column(db.String(64), nullable=False)
    title = db.Column(db.String(64), nullable=True)

    def __init__(
            self,
            setID,
            username,
            title,
            artistLink,
    ):
        self.setID = setID
        self.artistLink = artistLink
        self.username = username
        self.title = title


class SetMetadataSchema(ma.Schema):
    metadataID = fields.Integer()
    setID = fields.String(required=True)
    artistLink = fields.String(required=False)
    username = fields.String(required=True)
    title = fields.String(required=False)


class MultiGallerySchema(ma.Schema):
    artworkID = fields.Integer()
    metadata = fields.Nested(SetMetadataSchema)
    gallery = fields.List(fields.String(required=True))
    message = fields.String(required=True)


class MultiGalleryImportSchema(ma.Schema):
    metadataID = fields.Integer()
    setID = fields.String(required=True)
    artworkLink = fields.String(required=True)
    artistLink = fields.String(required=False)
    username = fields.String(required=True)
    title = fields.String(required=False)
