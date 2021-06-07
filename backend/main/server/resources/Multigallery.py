from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import MultiGallery, MultiGallerySchema, MultiGalleryImportSchema, SetMetadata, SetMetadataSchema

artwork_schema = MultiGalleryImportSchema()
gallery_schema = MultiGallerySchema(many=True)


@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class MultiGalleryCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of messages available on the server"""
        return {'status': 'success', 'count': MultiGallery.query.count()}, 200


class MultiGalleryListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Artwork on the server ordered by set id"""
        multigallery = db.session.query(MultiGallery, SetMetadata).join(SetMetadata).all()

        if not multigallery:
            return {
                'status': 'success',
                'multigallery': []
            }, 206  # Partial Content Served, the other status code never loads

        # Create a map of {mdatadataID: {metadata: {}, gallery: [art1, art2,...]}}
        set_map = {}
        for arkwork, metadata in multigallery:
            if metadata.setID not in set_map:
                set_map[metadata.setID] = {
                    "metadata": metadata, "gallery": [arkwork.artworkLink]
                }
                continue
            set_map[metadata.setID]["gallery"].append(arkwork.artworkLink)
        gallery_list = [
            {"metadata": artworks["metadata"], "gallery": artworks["gallery"]}
            for _, artworks in set_map.items()
        ]

        multigallery_json = gallery_schema.dump(gallery_list)
        return {'status': 'success', 'multigallery': multigallery_json}, 200
