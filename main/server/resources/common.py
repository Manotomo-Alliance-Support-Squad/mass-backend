from flask import make_response


def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    response.headers[
        'Access-Control-Allow-Headers'] = (
            'Access-Control-Allow-Headers, Origin,Accept, '
            'X-Requested-With, Content-Type, '
            'Access-Control-Request-Method, '
            'Access-Control-Request-Headers')
    return response


def make_response_and_add_headers(*args):
    response = make_response(args)
    return add_header(response)
