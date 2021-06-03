from main.server import db
from main.server.models import Announcement, Gallery, Games, Message, Video

def insertAnnouncement(data):                                                                                           
    if not data.message: 
        return 2
    res = Announcement.query.filter_by(message=data.message).first()                                                             
    if res:                                                                                                              
        return 1                                                                                                             
    res = Announcement(message=data.message)
    db.session.add(res)                                                                                                  
    return 0                                                                                                                 

def insertGallery(data):                                                                                                
    res = Gallery.query.filter_by(artworkLink=data.artworkLink).first()                                                       
    if res:
        return 1
    res = Gallery(artworkLink=data.artworkLink,
                        artistLink=data.artistLink,
                        username=data.username,
                        title=data.title)
    db.session.add(res)
    return 0

def insertGame(data):
    res = Games.query.filter_by(gameLink=data.gameLink).first()
    if res:
        return 1
    res = Games(gameLink=data.gameLink,
                    gitLink=data.gitLink,
                    description=data.description,
                    title=data.title,
                    thumbnail=data.thumbnail)
    db.session.add(res)

def insertMessage(data):
    res = Message.query.filter_by(orig_msg=data.orig_msg).first()
    if res:
        return 1
    res = Message(orig_msg=data.orig_msg,
                      tl_msg=data.tl_msg,
                      country=data.country,
                      username=data.username)
    db.session.add(res)
    return 0

def insertVideo(data):
    res = Video.query.filter_by(
            videoLink=data.videoLink).first()
    if res:
        return 1
    res = Video(videoLink=data.videoLink,
                    artistLink=data.artistLink,
                    username=data.username,
                    title=data.title)
    db.session.add(res)
