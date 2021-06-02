from main.server import db
from main.server.models import Announcement, Gallery, Games, Message, Video

def insertAnnouncement(col, data):                                                                                           
    if col[0] != "message": 
        return 2                                                                                         
    if not data or not data[0]: 
        return 2
    text = data[0]                                                                                                           
    message = Announcement.query.filter_by(message=text).first()                                                             
    if message:                                                                                                              
        return 1                                                                                                             
    message = Announcement(message=text)                                                                                     
    db.session.add(message)                                                                                                  
    return 0                                                                                                                 

def insertGallery(col, data):                                                                                                
    artworkLink = artistLink = title = username = None                                                                       
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
    message = Gallery.query.filter_by(artworkLink=artworkLink).first()                                                       
    if message:
        return 1
    message = Gallery(artworkLink=artworkLink,
                        artistLink=artistLink,
                        username=username,
                        title=title)
    db.session.add(message)
    return 0

def insertGame(col, data):
    gameLink = gitLink = description = title = thumbnail = None
    for i in range(0, len(data)):
        if col[i] == "gameLink" and data[i]: gameLink = data[i]
        elif col[i] == "gitLink": gitLink = data[i]
        elif col[i] == "description": description = data[i]
        elif col[i] == "title" and data[i]: title = data[i]
        elif col[i] == "thumbnail": thumbnail = data[i]
        else: continue
    message = Games.query.filter_by(gameLink=gameLink).first()
    if message:
        return 1
    message = Games(gameLink=gameLink,
                    gitLink=gitLink,
                    description=description,
                    title=title,
                    thumbnail=thumbnail)
    db.session.add(message)

def insertMessage(col, data):
    orig_msg = tl_msg = country = username = None
    for i in range(0, len(data)):
        if col[i] == "orig_msg" and data[i]: orig_msg = data[i]
        elif col[i] == "tl_msg": tl_msg = data[i]
        elif col[i] == "country": country = data[i]
        elif col[i] == "username": username = data[i]
        else: continue
    message = Message.query.filter_by(orig_msg=orig_msg).first()
    if message:
        return 1
    message = Message(orig_msg=orig_msg,
                      tl_msg=tl_msg,
                      country=country,
                      username=username)
    db.session.add(message)
    return 0

def insertVideo(col, data):
    videoLink = artistLink = username = title = None
    for i in range(0, len(data)):
        if col[i] == "videoLink" and data[i]: videoLink = data[i]
        elif col[i] == "artistLink": artistLink = data[i]
        elif col[i] == "username": username = data[i]
        elif col[i] == "title": title = data[i]
        else: continue
    message = Video.query.filter_by(
            videoLink=videoLink).first()
    if message:
        return 1
    message = Video(videoLink=videoLink,
                    artistLink=artistLink,
                    username=username,
                    title=title)
    db.session.add(message)
 
