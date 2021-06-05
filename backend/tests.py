import argparse
from update_db import main as app_main
from main.server import app, db, models

class Arguments:
    csv_path = None
    table_name = None
    dry_run = None

RED="\033[31m"
YLW="\033[33m"
CLR="\033[00m"

def main(main_args):
    # loads a new database into memory. Not persistent
    app.config.from_object("main.server.config.TestingConfig")
    args = Arguments()
    db.create_all()

    # Announcement
    print(f"{YLW}===RUNNING TESTS FOR ANNOUNCEMENTS==={CLR}")
    args.csv_path = "./tests/announcement.csv"
    args.table_name = "ANNOUNCEMENTS"
    print(app_main(args))

    # Gallery
    print(f"{YLW}===RUNNING TESTS FOR GALLERY==={CLR}")
    args.csv_path = "./tests/gallery.csv"
    args.table_name = "GALLERY"
    print(app_main(args))

    # Games
    print(f"{YLW}===RUNNING TESTS FOR GAMES==={CLR}")
    args.csv_path = "./tests/games.csv"
    args.table_name = "GAMES"
    print(app_main(args))

    # Messages
    print(f"{YLW}===RUNNING TESTS FOR MESSAGES==={CLR}")
    args.csv_path = "./tests/message.csv"
    args.table_name = "MESSAGES"
    print(app_main(args))

    # Video
    print(f"{YLW}===RUNNING TESTS FOR VIDEO==={CLR}")
    args.csv_path = "./tests/video.csv"
    args.table_name = "VIDEO"
    print(app_main(args))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
            description="Tests for the backend")
    main_args = parser.parse_args()
    main(main_args)
