import csv
import argparse

from main.server import db
from main.utils.insert import insertMessage, insertGallery, insertGame, insertAnnouncement, insertVideo

def parse_csv(csv_path: str):
    with open(csv_path) as csv_f:
        csv_r = csv.reader(csv_f, delimiter=',')
        return [row for row in csv_r]

def main(args):
    csv = parse_csv(args.csv_path)
    switch = {
            "MESSAGES": insertMessage,
            "GALLERY": insertGallery,
            "GAMES": insertGame,
            "ANNOUNCEMENTS": insertAnnouncement,
            "VIDEO": insertVideo,
            }

    insert = switch.get(args.table_name)
    fail=0
    for data in csv[1:]:
        # note: duplicated columns aren't handled, and the last column will reflect upon the db
        res = insert(csv[0], data)
        RED="\033[31m"
        CLR="\033[00m"
        if res == 1:
            print(f"{RED}duplicate entry, skipping: {CLR}")
            print(data)
        if res == 2:
            print(f"{RED}data was missing or column mismatch{CLR}")
            print(data)
    if not args.dry_run and not fail: 
        db.session.commit()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
            description="update a database from a CSV file")
    parser.add_argument(
            "--csv", "-c", dest="csv_path", required=True,
            help="The path to the csv file")
    parser.add_argument(
            "--table", "-t", dest="table_name", required=True,
            help="The name of the table to insert into")
    parser.add_argument(
            "--dry-run", "-d", dest="dry_run", action='store_true', default=False,
            help="Do not commit the database")
    args = parser.parse_args()
    main(args)
