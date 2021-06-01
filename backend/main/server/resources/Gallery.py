from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Gallery, GallerySchema

artwork_schema = GallerySchema()
gallery_schema = GallerySchema(many=True)

def insertGallery(col, data):
    for i in range(0, len(data)):
        if col[i] == "artworkLink": artworkLink = data[i]
        elif col[i] == "title": title = data[i]
        elif col[i] == "username": username = data[i]
        else: return 2
    message = Message.query.filter_by(artworkLink=artworkLink).first()
    if message:
        return 1
    message = Gallery(artworkLink=artworkLink,
                          username=username,
                          title=title)
    db.session.add(message)
    return 0

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class GalleryCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of messages available on the server"""
        return {'status': 'success', 'count': Gallery.query.count()}, 200


class GalleryListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Artwork on the server"""
        gallery = Gallery.query.all()
        gallery = gallery_schema.dump(gallery)

        if not gallery:
            return {'status': 'success',
                    'gallery': gallery}, 206  # Partial Content Served, the other status code never loads

        return {'status': 'success', 'gallery': gallery}, 200
