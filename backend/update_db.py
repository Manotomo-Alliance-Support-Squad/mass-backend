import csv
import argparse

from main.server import db

from main.server.resources.Message import insertMessage
from main.server.resources.Gallery import insertGallery 
from main.server.resources.Game import insertGame
from main.server.resources.Announcement import insertAnnouncement
from main.server.resources.Video import insertVideo

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
    for data in csv:
        if data == csv[0]:
            continue
        #note: duplicated columns aren't handled, and the last column will reflect upon the db
        res = insert(csv[0], data)
        if res == 1:
            print("duplicate entry, not adding: ")
            print(data)
        if res == 2:
            print("column-table mismatch. Failing. (one or more of the columns don't correspond to db entries)")
            fail=1
    if not args.dry_run and not fail: db.session.commit()

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
            "--dry-run", "-d", dest="dry_run", action='store_true',
            help="Do not commit the database")
    args = parser.parse_args()
    main(args)
