from flask import Blueprint
from flask_restful import Api

from main.server.resources.Message import MessageListResource, MessageResource, MessageListRangeResource, MessageCount
from main.server.resources.Game import GameCount, GameListResource
from main.server.resources.Gallery import GalleryCount, GalleryListResource
from main.server.resources.Multigallery import MultiGalleryCount, MultiGalleryListResource
from main.server.resources.Video import VideoCount, VideoListResource
from main.server.resources.Announcement import AnnouncementListResource, AnnouncementCount

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

# Gallery with with secondary key to group art together
api.add_resource(MultiGalleryListResource, '/multigallery')
api.add_resource(MultiGalleryCount, '/multigallery/count')

# Videos
api.add_resource(VideoListResource, '/videos')
api.add_resource(VideoCount, '/videos/count')

# Announcements
api.add_resource(AnnouncementListResource, '/announcements')
api.add_resource(AnnouncementCount, '/announcements/count')
