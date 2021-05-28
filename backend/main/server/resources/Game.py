from flask_restful import Resource
from flask import request

from main.server import app, cache, db
from main.server.models import Games, GameSchema


games_schema = GameSchema(many=True)
game_schema = GameSchema()

def insertGame(gameLink, gitLink, description, title, thumbnail):
        message = Games.query.filter_by(gameLink=gameLink).first()
        if message:
            return {'status': 'fail', 'message': 'Game already exists'}, 400
        message = Games(gameLink=gameLink,
                        gitLink=gitLink,
                        description=description,
                        title=title,
                        thumbnail=thumbnail)
        db.session.add(message)
 
@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class GameListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Artwork on the server"""
        games = Games.query.all()
        games = games_schema.dump(games)

        if not games:
            return {'status': 'success', 'games': games}, 206  # Partial Content Served

        return {'status': 'success', 'games': games}, 200

class GameCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of games available on the server"""
        return {'status': 'success', 'count': Games.query.count()}, 200
