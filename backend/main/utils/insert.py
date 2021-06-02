from main.server import db
from main.server.models import Announcement, Gallery, Games, Message, Video

def insertAnnouncement(col, data):                                                                                           
    if col[0] != "message": 
        return 2                                                                                         
    if not data or not data[0]: 
        return 2
    text = data[0]                                                                                                           
    res = Announcement.query.filter_by(message=text).first()                                                             
    if res:                                                                                                              
        return 1                                                                                                             
    res = Announcement(message=text)                                                                                     
    db.session.add(res)                                                                                                  
    return 0                                                                                                                 

def insertGallery(col, data):                                                                                                
    artworkLink = None
    artistLink = None
    title = None
    username = None

    for i in range(0, len(data)):                                                                                            
        if col[i] == "artworkLink" and data[i]: 
            artworkLink = data[i]                                                        
        elif col[i] == "artistLink" and data[i]: 
            artistLink = data[i]                                                        
        elif col[i] == "title" and data[i]: 
            title = data[i]                                                                  
        elif col[i] == "username" and data[i]: 
            username = data[i]                                                            
        else: 
            continue                                                                                                       
    res = Gallery.query.filter_by(artworkLink=artworkLink).first()                                                       
    if res:
        return 1
    res = Gallery(artworkLink=artworkLink,
                        artistLink=artistLink,
                        username=username,
                        title=title)
    db.session.add(res)
    return 0

def insertGame(col, data):
    gameLink = None
    gitLink = None
    description = None
    title = None
    thumbnail = None

    for i in range(0, len(data)):
        if col[i] == "gameLink" and data[i]: 
            gameLink = data[i]
        elif col[i] == "gitLink":
            gitLink = data[i]
        elif col[i] == "description": 
            description = data[i]
        elif col[i] == "title" and data[i]: 
            title = data[i]
        elif col[i] == "thumbnail": 
            thumbnail = data[i]
        else: 
            continue
    res = Games.query.filter_by(gameLink=gameLink).first()
    if res:
        return 1
    res = Games(gameLink=gameLink,
                    gitLink=gitLink,
                    description=description,
                    title=title,
                    thumbnail=thumbnail)
    db.session.add(res)

def insertMessage(col, data):
    orig_msg = None
    tl_msg = None
    country = None
    username = None
    
    for i in range(0, len(data)):
        if col[i] == "orig_msg" and data[i]: 
            orig_msg = data[i]
        elif col[i] == "tl_msg": 
            tl_msg = data[i]
        elif col[i] == "country": 
            country = data[i]
        elif col[i] == "username": 
            username = data[i]
        else: 
            continue
    res = Message.query.filter_by(orig_msg=orig_msg).first()
    if res:
        return 1
    res = Message(orig_msg=orig_msg,
                      tl_msg=tl_msg,
                      country=country,
                      username=username)
    db.session.add(res)
    return 0

def insertVideo(col, data):
    videoLink = None
    artistLink = None
    username = None
    title = None

    for i in range(0, len(data)):
        if col[i] == "videoLink" and data[i]: 
            videoLink = data[i]
        elif col[i] == "artistLink": 
            artistLink = data[i]
        elif col[i] == "username": 
            username = data[i]
        elif col[i] == "title": 
            title = data[i]
        else: 
            continue
    res = Video.query.filter_by(
            videoLink=videoLink).first()
    if res:
        return 1
    res = Video(videoLink=videoLink,
                    artistLink=artistLink,
                    username=username,
                    title=title)
    db.session.add(res)
 
