from flask import request
from flask_jwt import jwt_required
from flask_restful import Resource

from main.server import cache
from main.server import db
from main.server.models import Announcement
from main.server.models import AnnouncementSchema
from main.server.resources.common import make_response_and_add_headers

announcement_schema = AnnouncementSchema()
announcements_schema = AnnouncementSchema(many=True)


class AnnouncementCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of announcements on the server"""
        return make_response_and_add_headers(
            {'status': 'success', 'count': Announcement.query.count()}, 200)


class AnnouncementListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all announcements on the server"""
        announcements = Announcement.query.all()
        announcements = announcements_schema.dump(announcements)

        if not announcements:
            # Partial Content Served
            return make_response_and_add_headers(
                {'status': 'success', 'announcements': announcements}, 206)

        return make_response_and_add_headers(
            {'status': 'success', 'announcements': announcements}, 200)

    @jwt_required()
    def post(self):
        """Add announcement"""
        json_data = request.get_json(force=True)

        if not json_data:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'No input data'}, 400)

        errors = announcement_schema.validate(json_data)

        if errors:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Error handling request'}, 422)

        data = announcement_schema.load(json_data)

        announcement = Announcement.query.filter_by(
            message=data.get('message')).first()

        if announcement:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Announcement already exists'}, 400)

        announcement = Announcement(message=data.get('message'))

        db.session.add(announcement)
        db.session.commit()

        return make_response_and_add_headers(
            {'status': 'success', 'message': 'Announcement successfully created'}, 201)


class AnnouncementResource(Resource):
    @jwt_required()
    def delete(self, announcementID):
        """delete a announcement by ID"""

        announcement = Announcement.query.filter_by(
            announcementID=announcementID)

        if not announcement.first():
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'No announcement with ID ' + str(announcementID) + ' exists'}, 404)

        announcement.delete()
        db.session.commit()
        return make_response_and_add_headers(
            {'status': 'sucess', 'message': 'Announcement Deleted'}, 200)
