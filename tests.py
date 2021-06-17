import argparse
from update_db import main as updatedb_main
from main.server import app, db, models
from main.server.status import Status

class Arguments:
    csv_path = None
    table_name = None
    dry_run = None

RED="\033[31m"
GRN="\033[32m"
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
    assert updatedb_main(args) == Status.OK
    assert updatedb_main(args) == Status.WARN
    print(f"{GRN}[🗸] Test Pass{CLR}")

    # Gallery
    print(f"{YLW}===RUNNING TESTS FOR GALLERY==={CLR}")
    args.csv_path = "./tests/gallery.csv"
    args.table_name = "GALLERY"
    assert updatedb_main(args) == Status.OK
    assert updatedb_main(args) == Status.WARN
    print(f"{GRN}[🗸] Test Pass{CLR}")

    # MultiGallery
    print(f"{YLW}===RUNNING TESTS FOR MULTIGALLERY==={CLR}")
    args.csv_path = "./tests/multigallery.csv"
    args.table_name = "MULTIGALLERY"
    assert updatedb_main(args) == Status.OK
    assert updatedb_main(args) == Status.WARN
    print(f"{GRN}[🗸] Test Pass{CLR}")

    # Games
    print(f"{YLW}===RUNNING TESTS FOR GAMES==={CLR}")
    args.csv_path = "./tests/games.csv"
    args.table_name = "GAMES"
    assert updatedb_main(args) == Status.OK
    assert updatedb_main(args) == Status.WARN
    print(f"{GRN}[🗸] Test Pass{CLR}")

    # Messages
    print(f"{YLW}===RUNNING TESTS FOR MESSAGES==={CLR}")
    args.csv_path = "./tests/message.csv"
    args.table_name = "MESSAGES"
    assert updatedb_main(args) == Status.OK
    assert updatedb_main(args) == Status.WARN
    print(f"{GRN}[🗸] Test Pass{CLR}")

    # Video
    print(f"{YLW}===RUNNING TESTS FOR VIDEO==={CLR}")
    args.csv_path = "./tests/video.csv"
    args.table_name = "VIDEO"
    assert updatedb_main(args) == Status.OK
    assert updatedb_main(args) == Status.WARN
    print(f"{GRN}[🗸] Test Pass{CLR}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
            description="Tests for the backend")
    main_args = parser.parse_args()
    main(main_args)
