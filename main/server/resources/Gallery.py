from flask import request
from flask_jwt import jwt_required
from flask_restful import Resource

from main.server import cache
from main.server import db
from main.server.models import Gallery
from main.server.models import GallerySchema
from main.server.resources.common import make_response_and_add_headers

artwork_schema = GallerySchema()
gallery_schema = GallerySchema(many=True)


class GalleryCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of messages available on the server"""
        return make_response_and_add_headers(
            {'status': 'success', 'count': Gallery.query.count()}, 200)


class GalleryListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Artwork on the server"""
        gallery = Gallery.query.all()
        gallery = gallery_schema.dump(gallery)

        if not gallery:
            return make_response_and_add_headers(
                {'status': 'success', 'gallery': gallery},
                # Partial Content Served, the other status code never loads
                206)

        return make_response_and_add_headers(
            {'status': 'success', 'gallery': gallery}, 200)

    @jwt_required()
    def post(self):
        """Add Artwork"""
        json_data = request.get_json(force=True)

        if not json_data:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'No input data'}, 400)

        errors = artwork_schema.validate(json_data)

        if errors:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Error handling request'}, 422)

        data = artwork_schema.load(json_data)

        message = Gallery.query.filter_by(
            artworkLink=data.get('artworkLink')).first()

        if message:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Artwork already exists'}, 400)

        message = Gallery(artworkLink=data.get('artworkLink'),
                          artistLink=data.get('artistLink'),
                          username=data.get('username'),
                          title=data.get('title'))

        db.session.add(message)
        db.session.commit()

        return make_response_and_add_headers(
            {'status': 'success',
             'message': 'Artwork entry successfully created'}, 201)
