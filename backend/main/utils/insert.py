from main.server import db
from main.server.models import Announcement, Gallery, Games, Message, Video
from main.server.status import Status

def insertAnnouncement(data):
    if not data.message: 
        return Status.FAIL
    res = Announcement.query.filter_by(message=data.message).first()                                                             
    if res:
        return Status.WARN
    res = Announcement(message=data.message)
    db.session.add(res)                                                                                                  
    return Status.OK

def insertGallery(data):                                                                                                
    if not data.artworkLink:
        return Status.FAIL
    res = Gallery.query.filter_by(artworkLink=data.artworkLink).first()                                                       
    if res:
        return Status.WARN
    res = Gallery(artworkLink=data.artworkLink,
            artistLink=data.artistLink,
            username=data.username,
            title=data.title)
    db.session.add(res)
    return Status.OK

def insertGame(data):
    if not data.gameLink:
        return Status.FAIL
    res = Games.query.filter_by(gameLink=data.gameLink).first()
    if res:
        return Status.WARN
    res = Games(gameLink=data.gameLink,
            gitLink=data.gitLink,
            description=data.description,
            title=data.title,
            thumbnail=data.thumbnail)
    db.session.add(res)

def insertMessage(data):
    if not data.orig_msg:
        return Status.FAIL
    res = Message.query.filter_by(orig_msg=data.orig_msg).first()
    if res:
        return Status.WARN
    res = Message(orig_msg=data.orig_msg,
            tl_msg=data.tl_msg,
            country=data.country,
            username=data.username)
    db.session.add(res)
    return Status.OK

def insertVideo(data):
    if not data.videoLink:
        return Status.FAIL
    res = Video.query.filter_by(
            videoLink=data.videoLink).first()
    if res:
        return Status.WARN
    res = Video(videoLink=data.videoLink,
            artistLink=data.artistLink,
            username=data.username,
            title=data.title)
    db.session.add(res)
