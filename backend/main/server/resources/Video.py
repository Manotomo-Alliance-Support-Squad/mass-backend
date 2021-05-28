from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Video, VideoSchema

video_schema = VideoSchema()
videos_schema = VideoSchema(many=True)

def insertVideo(videoLink, artistLink, username, title):
    message = Video.query.filter_by(
            videoLink=videoLink).first()
    if message:
        return {'status': 'fail', 'message': 'Video already exists'}, 400
    message = Video(videoLink=videoLink,
                    artistLink=artistLink,
                    username=username,
                    title=title)
    db.session.add(message)
        

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class VideoCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of messages available on the server"""
        return {'status': 'success', 'count': Video.query.count()}, 200


class VideoListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Video on the server"""

        all_videos = Video.query.all()
        all_videos = videos_schema.dump(all_videos)

        if not all_videos:
            return {'status': 'success',
                    'videos': all_videos}, 206  # Partial Content Served, the other status code never loads

        return {'status': 'success', 'videos': all_videos}, 200
