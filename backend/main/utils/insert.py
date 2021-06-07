from main.server import db
from main.server.models import Announcement, MultiGallery, Gallery, Games, Message, Video, SetMetadata
from main.utils.dto import AnnouncementDTO, MultiGalleryDTO, GalleryDTO, GameDTO, MessageDTO, VideoDTO
from main.server.status import Status

def insertAnnouncement(data):
    if not isinstance(data, AnnouncementDTO):
        raise TypeError('data must be of type AnnouncementDTO')
    if not data.message: 
        return Status.FAIL
    res = Announcement.query.filter_by(message=data.message).first()                                                             
    if res:
        return Status.WARN
    res = Announcement(message=data.message)
    db.session.add(res)                                                                                                  
    return Status.OK

def insertMultiGallery(data):                                                                                                
    if not isinstance(data, MultiGalleryDTO):
        raise TypeError('data must be of type MultiGalleryDTO')
    if not data.artworkLink:
        return Status.FAIL
    if not SetMetadata.query.filter_by(setID=data.setID).first():
        metadata_entry = SetMetadata(
            setID=data.setID,
            artistLink=data.artistLink,
            username=data.username,
            title=data.title,
        )
        db.session.add(metadata_entry)
        
    if not MultiGallery.query.filter_by(artworkLink=data.artworkLink).first():
        multigallery_entry = MultiGallery(
            setID=data.setID,
            artworkLink=data.artworkLink,
        )
        db.session.add(multigallery_entry)
    else:
        # return from this insert with dupe warn
        return Status.WARN

    return Status.OK

def insertGallery(data):                                                                                                
    if not isinstance(data, GalleryDTO):
        raise TypeError('data must be of type GalleryDTO')
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
    if not isinstance(data, GameDTO):
        raise TypeError('data must be of type GameDTO')
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
    if not isinstance(data, MessageDTO):
        raise TypeError('data must be of type MessageDTO')
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
    if not isinstance(data, VideoDTO):
        raise TypeError('data must be of type VideoDTO')
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
