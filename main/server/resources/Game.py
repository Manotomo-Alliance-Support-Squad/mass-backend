from flask import request
from flask_jwt import jwt_required
from flask_restful import Resource

from main.server import cache
from main.server import db
from main.server.models import Games
from main.server.models import GameSchema
from main.server.resources.common import make_response_and_add_headers


games_schema = GameSchema(many=True)
game_schema = GameSchema()


class GameListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Artwork on the server"""
        games = Games.query.all()
        games = games_schema.dump(games)

        if not games:
            # Partial Content Served
            return make_response_and_add_headers(
                {'status': 'success', 'games': games}, 206)

        return make_response_and_add_headers(
            {'status': 'success', 'games': games}, 200)

    @jwt_required()
    def post(self):
        """Add Game"""
        json_data = request.get_json(force=True)

        if not json_data:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'No input data'}, 400)

        errors = game_schema.validate(json_data)

        if errors:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Error handling request'}, 422)

        data = game_schema.load(json_data)

        message = Games.query.filter_by(gameLink=data.get('gameLink')).first()

        if message:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Game already exists'}, 400)

        message = Games(gameLink=data.get('gameLink'),
                        gitLink=data.get('gitLink'),
                        description=data.get('description'),
                        title=data.get('title'))

        db.session.add(message)
        db.session.commit()

        return make_response_and_add_headers(
            {'status': 'success', 'message': 'Game entry successfully created'}, 201)


class GameCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of games available on the server"""
        return make_response_and_add_headers(
            {'status': 'success', 'count': Games.query.count()}, 200)
