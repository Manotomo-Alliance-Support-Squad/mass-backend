from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Video, VideoSchema
from flask_jwt import jwt_required

video_schema = VideoSchema()
cinema = VideoSchema(many=True)


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
        """Gets all Artwork on the server"""
        all_videos = Video.query.all()
        cinema = all_videos.dump(all_videos)

        if not cinema:
            return {'status': 'success',
                    'cinema': cinema}, 206  # Partial Content Served, the other status code never loads

        return {'status': 'success', 'cinema': cinema}, 200

    @jwt_required()
    def post(self):
        """Add Artwork"""
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = video_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = video_schema.load(json_data)

        message = Video.query.filter_by(
            videoLink=data.get('videoLink')).first()

        if message:
            return {'status': 'fail', 'message': 'Artwork already exists'}, 400

        message = Video(videoLink=data.get('videoLink'),
                        artistLink=data.get('artistLink'),
                        username=data.get('username'),
                        title=data.get('title'))

        db.session.add(message)
        db.session.commit()

        return {'status': 'success', 'message': 'Artwork entry successfully created'}, 201
