from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Announcement, AnnouncementSchema

announcement_schema = AnnouncementSchema()
announcements_schema = AnnouncementSchema(many=True)

def insertAnnouncement(col, data):
    if col[0] != "message": return 2
    text = data[0]
    message = Message.query.filter_by(message=text).first()
    if message:
        return 1
    message = Gallery(message=text)
    db.session.add(message)
    return 0

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class AnnouncementCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of announcements on the server"""
        return {'status': 'success', 'count': Announcement.query.count()}, 200

class AnnouncementListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all announcements on the server"""
        announcements = Announcement.query.all()
        announcements = announcements_schema.dump(announcements)

        if not announcements:
            return {'status': 'success', 'announcements': announcements}, 206  # Partial Content Served

        return {'status': 'success', 'announcements': announcements}, 200
