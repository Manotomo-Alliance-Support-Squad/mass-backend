from flask import Blueprint
from flask_restful import Api

from main.server.resources.Message import MessageListResource, MessageResource, MessageListRangeResource, MessageCount
from main.server.resources.Game import GameCount, GameListResource
from main.server.resources.Gallery import GalleryCount, GalleryListResource
from main.server.resources.Archive import ArchiveListResource, ArchiveResource, ArchiveCount, ArchiveRandomResource
from main.server.resources.Annoucement import AnnoucementListResource, AnnoucementCount

# Api Blueprint
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Routes

# Messages
api.add_resource(MessageListResource, '/messages')
api.add_resource(MessageResource, '/messages/<messageID>')
api.add_resource(MessageListRangeResource, '/messages/range/<lower>/<upper>')
api.add_resource(MessageCount, '/messages/count')

# Games
api.add_resource(GameListResource, '/games')
api.add_resource(GameCount, '/games/count')

# Gallery
api.add_resource(GalleryListResource, '/gallery')
api.add_resource(GalleryCount, '/gallery/count')

# Archive
api.add_resource(ArchiveListResource, '/archives/<who>')
api.add_resource(ArchiveRandomResource, '/archives/<who>/random')
api.add_resource(ArchiveResource, '/archives/<who>/<archiveID>')
api.add_resource(ArchiveCount, '/archives/<who>/count')

# Annoucements
api.add_resource(AnnoucementListResource, '/annoucements')
api.add_resource(AnnoucementCount, '/annoucements/count')
