class AnnouncementDTO:
    message = None

class GalleryDTO:
    artworkLink = None
    artistLink = None
    title = None
    username = None

class GameDTO:
    gameLink = None
    gitLink = None
    description = None
    title = None
    thumbnail = None

class MessageDTO:
    orig_msg = None
    tl_msg = None
    country = None
    username = None

class VideoDTO:
    videoLink = None
    artistLink = None
    username = None
    title = None

def getDTOFromColData(className, col, data):
    dto = className()
    for i in range(0, len(data)):
        if hasattr(dto, col[i]):
            dto.__setattr__(col[i], data[i])
    return dto
