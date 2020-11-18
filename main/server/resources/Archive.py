import datetime

from flask import request
from flask_jwt import jwt_required
from flask_restful import Resource

from main.server import cache
from main.server import db
from main.server.models import ArchiveCoco
from main.server.models import ArchiveHaachama
from main.server.models import ArchiveSchema
from main.server.resources.common import make_response_and_add_headers

archives_schema = ArchiveSchema(many=True)
archive_schema = ArchiveSchema()


def tableConversion(who):
    if who == "coco":
        return ArchiveCoco
    elif who == "haachama":
        return ArchiveHaachama
    else:
        return None


class ArchiveCount(Resource):
    @cache.cached(timeout=100)
    def get(self, who):
        """Gets the number of archives available"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No data for {who} exists'}, 404)

        return make_response_and_add_headers(
            {'status': 'success', 'count': archiveTable.query.count()}, 200)


class ArchiveListResource(Resource):
    @cache.cached(timeout=100)
    def get(self, who):
        """Gets all archive links"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No data for {who} exists'}, 404)

        archives = archiveTable.query.all()
        archives = archives_schema.dump(archives)

        if not archives:
            # Partial Content Served
            return make_response_and_add_headers(
                {'status': 'success', 'archives': archives}, 206)

        return make_response_and_add_headers(
            {'status': 'success', 'archives': archives}, 200)

    @jwt_required()
    def post(self, who):
        """Add archive link"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No data for {who} exists'}, 404)

        json_data = request.get_json(force=True)

        if not json_data:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'No input data'}, 400)

        errors = archive_schema.validate(json_data)

        if errors:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'Error handling request'}, 422)

        data = archive_schema.load(json_data)

        archive = archiveTable.query.filter_by(
            archiveURL=data.get('archiveURL')).first()

        if archive:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': 'archive already exists'}, 400)

        archive = archiveTable(archiveURL=data.get('archiveURL'))

        db.session.add(archive)
        db.session.commit()

        return make_response_and_add_headers(
            {'status': 'success', 'message': 'Archive successfully created'},
            201)


class ArchiveResource(Resource):
    @cache.cached(timeout=100)
    def get(self, who, archiveID):
        """Get an archive by archive ID"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No data for {who} exists'}, 404)

        archive = archiveTable.query.filter_by(archiveID=archiveID)

        if not archive.first():
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No archive with ID {archiveID} exists'}, 404)

        archive = archives_schema.dump(archive)
        return make_response_and_add_headers(
            {'status': 'success', 'archives': archive}, 200)

    @jwt_required()
    def delete(self, who, archiveID):
        """Delete an archive by ID"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No data for {who} exists'}, 404)

        archive = archiveTable.query.filter_by(archiveID=archiveID)

        if not archive.first():
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No archive with ID {archiveID} exists'}, 404)

        archive.delete()
        db.session.commit()
        return make_response_and_add_headers(
            {'status': 'sucess', 'message': 'Archive Deleted'}, 200)


class ArchiveRandomResource(Resource):
    @cache.cached(timeout=100)
    def get(self, who):
        """Get a random archive link."""
        # The source of randomness is the order of the database. The code only pulls consecutive IDs from the database.
        archiveTable = tableConversion(who)
        if not archiveTable:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No data for {who} exists'}, 404)

        size = archiveTable.query.count()
        daysPassed = (datetime.date.today() - datetime.date(2020, 10, 4)).days
        if size == 0:
            return make_response_and_add_headers(
                {'status': 'fail', 'message': f'No archives for {who} exists'}, 404)
        # modulus does not return negative, add one because sqlite index sucks and starts at 1
        archiveID = daysPassed % size + 1

        archive = archiveTable.query.filter_by(archiveID=archiveID)
        archive = archives_schema.dump(archive)
        return make_response_and_add_headers(
            {'status': 'success', 'archives': archive}, 200)
