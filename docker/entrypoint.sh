#!/bin/sh
/app/venv/bin/python3 /app/manage.py create_db
/app/venv/bin/waitress-serve --listen=0.0.0.0:5000 main.server:app
