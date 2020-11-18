from flask import request
from flask_jwt import jwt_required
from flask_restful import Resource

from main.server import cache
from main.server import db
from main.server.models import Animation
from main.server.models import AnimationSchema
from main.server.resources.common import make_response_and_add_headers

animation_schema = AnimationSchema()
animations_schema = AnimationSchema(many=True)


class AnimationCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of messages available on the server"""
        return make_response_and_add_headers(
            {'status': 'success', 'count': Animation.query.count()}, 200)


class AnimationListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Animations on the server"""
        animations = Animation.query.all()
        animations = animations_schema.dump(animations)

        if not animations:
            return make_response_and_add_headers(
                {'status': 'success', 'animations': animations}, 206)  # Partial Content Served, the other status code never loads

        return make_response_and_add_headers(
            {'status': 'success', 'animations': animations}, 200)

    @jwt_required()
    def post(self):
        """Add Animation"""
        json_data = request.get_json(force=True)

        if not json_data:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'No input data'}, 400)

        errors = animation_schema.validate(json_data)

        if errors:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Error handling request'}, 422)

        data = animation_schema.load(json_data)

        message = Animation.query.filter_by(
            animationLink=data.get('animationLink')).first()

        if message:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Animation already exists'}, 400)

        message = Animation(
            animationLink=data.get('animationLink'),
            artistLink=data.get('artistLink'),
            username=data.get('username'),
            title=data.get('title'))

        db.session.add(message)
        db.session.commit()

        return make_response_and_add_headers(
            {'status': 'success', 'message': 'Animation entry successfully created'}, 201)
